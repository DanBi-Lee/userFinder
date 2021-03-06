[TOC]

# GitHub 사용자 검색기

## 사용된 기술 스택 🛠

- javascript, html, scss (+postCSS)
- webpack (사용 패키지는 페이지 하단에 기술)

## 실행 방법 ✨

- `yarn install` : 프로젝트의 종속성 설치
- ★ `yarn start` : 개발모드에서 앱 실행
- ★ `yarn build` : 프로덕션 모드 빌드
- `yarn dev` : 개발모드 빌드

## 구현사항 소개

### 1. Github 사용자 검색 화면

![깃헙사용자검색](https://user-images.githubusercontent.com/50724377/113798716-b0a9cb80-978e-11eb-811b-0891f78ddfcb.gif) 

- [#4] github 사용자 검색 기능

  - ★ 검색어 입력창에 검색어를 입력하고, 검색 버튼을 클릭하면 Github 사용자 검색 API (https://developer.github.com/v3/search/#search-users) 를 호출하여 사용자를 검색합니다. 검색 API에 사용되는 필드는 사용자 이름으로 제한합니다.

  - ★ 검색 결과는 최대 100개까지만 보여줍니다. 검색 API 호출 시 page는 1, per_page는 100으로 설정합니다. 자세한 내용은 Github 검색 API 문서를 참고해주세요.

  - ★ Github 사용자 검색 API 응답을 받아 사용자 리스트를 보여줍니다. 각 사용자 별로 프로필 이미지, 사용자 이름, 즐겨찾기 여부를 보여줍니다.

    > - [#11] 검색 로딩중, 에러 메세지 UI 추가
    >   - 검색 로딩중, 결과가 에러일 경우, 검색 결과가 없을 경우의 UI를 추가했습니다.

- [#5] github 사용자 검색 결과 정렬

  - ★ 사용자 이름 순으로 정렬합니다. 정렬 순서는 한글, 영어, 기타 유니코드 순입니다.

  - ★ 사용자 이름 첫 글자의 초성 또는 알파벳으로 헤더를 붙여줍니다.

    > 한글이 있을 경우엔 자음과 한글이 비교되도록 구현했습니다.
    >
    > ex) `[ 'ㄱ', 'ㄴ', 'ㄷ', '가', '나', '다' ]`배열의 경우 `['ㄱ', '가', 'ㄴ', '나', 'ㄷ', '다' ]`순서로 정렬

- [#6] github 사용자 즐겨찾기 기능 구현

  - ★ 사용자가 이미 즐겨찾기에 추가되어 있으면 이를 표시합니다.

  - ★ 각 사용자의 아이템 뷰를 누르면 즐겨찾기로 추가합니다. 이미 즐겨찾기된 사용자의 아이템 뷰를 누르면 즐겨찾기를 취소합니다.

    > 유저가 즐겨찾기 추가 기능이 있다는 것을 직관적으로 이해하고, 행동에 대한 원하는 결과를 얻게 만들기 위해 즐겨찾기 버튼을 따로 설계해서 그것을 누르면 아이템 뷰를 누른것과 동일하게 UI를 만들었습니다.

  - ★ 본 화면에서 해당 사용자를 즐겨찾기 추가/취소하면, 즐겨찾기 검색 화면에서도 해당 사용자를 추가/삭제합니다.

  - ★ 즐겨찾기한 사용자를 브라우저 로컬 저장소에 저장

    > 로컬 저장소에 `favorite`, `favoriteData ` 이 두 가지 아이템을 만들었습니다.
    >
    > - `favorite` : 즐겨찾기에 등록한 유저 리스트를 배열 형태로 저장
    >
    >   - ex (요약)
    >
    >     ```json
    >     [
    >       {
    >         "login": "DanBi-Lee",
    >         "id": 50724377,
    >         "node_id": "MDQ6VXNlcjUwNzI0Mzc3",
    >         "avatar_url": "https://avatars.githubusercontent.com/u/50724377?v=4"
    >       },
    >       {
    >         "login": "danbi-lee2125",
    >         "id": 59549644,
    >         "node_id": "MDQ6VXNlcjU5NTQ5NjQ0",
    >         "avatar_url": "https://avatars.githubusercontent.com/u/59549644?v=4"
    >       }
    >     ]
    >     ```
    >
    > - `favoriteData` : 즐겨찾기에 등록한 유저 정보를 `{ 유저 아이디 : boolean }`형식의 객체로 저장 (유저리스트를 검색 결과 화면에 출력할 때, 즉시 객체에서 찾아 표시할 수 있도록)
    >
    >   - ex.
    >
    >     ```json
    >     {
    >       "50724377": true,
    >       "59549644": true
    >     }
    >     ```

### 2. 즐겨찾기 검색 화면

![즐겨찾기 사용자 검색](https://user-images.githubusercontent.com/50724377/113798761-c0c1ab00-978e-11eb-894c-03965aca3f98.gif) 

- [#7] 즐겨찾기 검색 기능 구현

  - ★ 검색어 입력창에 검색어를 입력하고 검색 버튼을 클릭하면, 로컬 저장소에서 이름에 검색어가 포함된 사용자를 검색합니다. 검색 필드는 사용자 이름으로 제한합니다.

  - ★ 검색어와 매칭된 모든 사용자 리스트를 보여줍니다. 각 사용자 별로 프로필 이미지, 사용자 이름, 즐겨찾기 여부를 표시합니다. (Github 사용자 검색화면과 동일)

    > 로컬 저장소의 즐겨찾기 리스트에서 검색 전에 우선 즐겨찾기한 모든 사용자를 표시하도록 구현했습니다. (여유가 좀 더 있었다면, 즐겨찾기 탭에서 검색을 했을때 close 버튼을 만들어서 쉽게 즐겨찾기 전체 목록을 볼 수 있도록 UX를 개선했을 것 같습니다.)

- [#8] 즐겨찾기 사용자 정렬

  - ★ 사용자 이름 순으로 정렬합니다. 정렬 순서는 한글, 영어, 기타 유니코드 순입니다.
  - ★ 사용자 이름 첫 글자의 초성 또는 알파벳으로 헤더를 붙여줍니다.

- [#9] 즐겨찾기 검색 화면 즐겨찾기 버튼 기능

  - ★ 각 사용자의 아이템 뷰를 누르면 즐겨찾기를 취소합니다.

  - ★ 본 화면에서는 해당 사용자를 삭제하고 Github 사용자 검색 화면에서도 해당 사용자의 아이템 뷰를 갱신합니다.

    > 즐겨찾기 화면에서 즐겨찾기를 취소할 경우, 즐겨찾기 유저 리스트 DOM 전체를 새로 그리지 않고 해당하는 유저 DOM만 삭제 하도록 구현했습니다.

## 배운 점

### 신경쓴 점 (+어려웠던 점)

- DOM

  - 재사용성과 확장성을 위해 `html`과 `js`파일을 나누지 않고, js파일을 통해 DOM을 생성하는 방식을 택했습니다.

  - 리액트의 컴포넌트와 비슷하게 필요한 부분에서는 이전 DOM을 지우고 새로 DOM을 작성하지만, 새로 그리는 게 낭비인 것 같은 기능에선 DOM을 수정하도록 만들었습니다.

    > ex. 검색 버튼 클릭시, 검색 결과 리스트를 전부 삭제하고 다시 그리지만 즐겨찾기 버튼을 누르면 버튼만 수정합니다.
    >

- UI/UX

  - 검색시 로딩중, 에러, 결과가 없을 때의 UI 구성했습니다.

    ![image](https://user-images.githubusercontent.com/50724377/113822315-3e4de100-97b8-11eb-896e-3df6257f55a9.png) ![image](https://user-images.githubusercontent.com/50724377/113901745-1e470d80-980a-11eb-85a5-747c9f606c28.png) ![image](https://user-images.githubusercontent.com/50724377/113822396-5aea1900-97b8-11eb-94af-20d10b5a7970.png)

  - 사용자 이름이 길어지면 여러줄로 표현했습니다.

    ![image](https://user-images.githubusercontent.com/50724377/113821777-8587a200-97b7-11eb-8036-ecbb732d2ba2.png) 

  - 탭메뉴 전환 시, 이전 화면(유저목록, 스크롤위치) 유지시킵니다.

- 문자열 다루기

  - 정렬

    - 한글, 영어, 기타 유니코드 순서

      - 가장 어려웠던 구현 사항은 사용자 이름을 한글, 영어, 기타 유니코드 순서로 정렬하는 것이었습니다. 기본적으로 자바스크립트에서 제공하는 `sort()`메소드를 사용하면 기타 유니코드, 영어, 한글 순서로 정렬되기 때문에 문자를 유니코드로 변환하여 한글/영어/기타 유니코드로 구분하여 순서를 부여했습니다. 아쉬운 점은 문자열 전체를 비교하는 로직을 짜는 것이 까다로워서 문자열의 첫 글자만 한글/영어/기타 유니코드 비교를 한 것입니다.

    - 한글과 자모음 비교

      - (GitHub의 유저명에 한글이 있지 않았지만) 한글과 자모음이 따로 분리되어 정렬되는 문제가 있었습니다. 이 부분은 `localeCompare()`메소드를 사용하여 해결했습니다.

    - 한글 초성 분리

      - 유저명이 한글일 경우 초성을 헤더로 만들라는 구현사항을 구현하려고 하면, 초성에 쓰이는 자음과 종성에 쓰이는 자음의 유니코드가 달라 원활하지 않은 문제가 있었습니다. 이를 해결하기 위해 초성에 쓰이는 자음배열을 따로 만들었습니다.

## 사용 패키지 🛠

- babel 설정
  - `@babel/cli`
  - `@babel/core`
  - `@babel/poyfill`
  - `@babel/preset-env`
  - `babel-loader`
- css 설정
  - sass
    - `node-sass`
    - `sass-loader`
  - postcss
    - `postcss`
    - `postcss-loader`
    - `autoprefixer`
  - css
    - `css-loader`
    - `cssnano`
    - `mini-css-extract-plugin`
    - `optimize-css-assets-webpack-plugin`
- 기타 설정
  - `webpack` , `webpack-cli`
  - `webpack-dev-server`
  - `webpack-merge`
  - `file-loader`
  - `clean-webpack-plugin`
  - `cross-env`
  - `html-webpack-plugin`
  - `terser-webpack-plugin`
- 라이브러리
  - `axios`
