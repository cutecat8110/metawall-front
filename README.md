# MetaWall - 社群內容牆（前端）

![Node](https://img.shields.io/badge/Node.js-v22.23.3-brightgreen.svg)
![Vue](https://img.shields.io/badge/Vue.js-v3-blue.svg)

> 分享生活的社群平台，支援會員註冊、圖文貼文、留言、按讚與追蹤。

![MetaWall 小貓咪船長的貼文與會員操作](public/demo.png)

## 📋 專案概述

此專案以 Vue Options API、Node.js 與 MongoDB 練習前後端開發，涵蓋介面切版、API 設計與資料串接。著重會員身分、貼文互動、圖片上傳，以及操作過程中的驗證與回饋。

**[Demo](https://cutecat8110.github.io/metawall-front/)** · [後端](https://github.com/cutecat8110/metawall-back) · [API 文件](https://metawall-backend-c89d.onrender.com/api-docs/)

## 🔨 核心技術

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://vuejs.org/" >
          Vue 3
        </a>
      </td>
      <td>JavaScript 框架</td>
    </tr>
    <tr>
      <td>
        <a href="https://vuex.vuejs.org/" >
          Vuex
        </a>
      </td>
      <td>Vue.js 的狀態管理庫</td>
    </tr>
    <tr>
      <td>
        <a href="https://www.npmjs.com/package/vue-axios" >
          Vue Axios
        </a>
      </td>
      <td>HTTP 請求工具</td>
    </tr>
  </tbody>
</table>

## 🛠️ 擴展套件

<table>
  <tbody>
    <tr>
      <td>
        <a href="https://sweetalert2.github.io/">
          SweetAlert 2
        </a>
      </td>
      <td>可定製訊息彈框</td>
    </tr>
    <tr>
      <td>
        <a href="https://www.npmjs.com/package/vue-loading-overlay">
          Vue Loading Overlay
        </a>
      </td>
      <td>loading 效果組件</td>
    </tr>
    <tr>
      <td>
        <a href="https://vee-validate.logaretm.com/v4/">
          VeeValidate
        </a>
      </td>
      <td>表單驗證庫</td>
    </tr>
        <tr>
      <td>
        <a href="https://momentjs.com/">
          moment
        </a>
      </td>
      <td>日期和時間處理庫</td>
    </tr>
  </tbody>
</table>

## 🌸 啟動指南

使用 `.node-version` 指定的 Node 22.23.3：

```sh
npm ci
npm run serve
```

預覽路徑為 `/metawall-front/`；預設連接目前的公開 API。

## 使用說明

鑰匙可帶入「小貓咪船長」。共用帳號的帳密固定，請勿填入個人資訊；需要個人資料空間時請另行註冊。

免費後端可能冷啟動；請求等待上限 90 秒，寫入不會自動重送。圖片上傳依賴 Imgur。

<details>
<summary>測試、部署與維護</summary>

使用 `.node-version` 固定的 Node 22.23.3：

```bash
npm ci
# 連本機隔離後端；後端先執行 npm run qa:serve
cp .env.example .env.local
npm run serve
npm test
npm run lint -- --no-fix
npm run build
```

預覽路徑為 `/metawall-front/`。`.npmrc` 固定舊 Vue CLI 套件的 peer dependency 安裝方式，避免新 npm 的解析差異；

- `VUE_APP_API` 是 API 根網址；`.env` 指向現有 Render，`.env.local` 可覆寫。
- `VUE_APP_USER_PHOTO`、`VUE_APP_USER_PHOTO_2`、`VUE_APP_SIGN_BG` 為原始預設圖片的路徑，現隨網站發布於 `public/images/`，保留原圖片。會員上傳圖片仍使用原 Imgur URL。
- `VUE_APP_*` 會進入公開產物，不能放秘密。
- Vitest / Vue Test Utils 驗證操作、並行請求、路由與圖片事件。單元測試略過 SFC 樣式編譯；樣式由真正的 Vue CLI 正式建置及瀏覽器 RWD QA 驗證。
- 正式發布前移除本機 API 覆寫，確認 `VUE_APP_API` 為 Render 正式網址；`npm run build` 產生 `docs/`，GitHub Pages 使用 `main` 的 `/docs`。
- Render 免費後端可能冷啟動；等待上限 90 秒，失敗可手動重試，寫入不自動重送。

詳細修正與兩輪驗證請看 [QA_CHANGELOG.md](QA_CHANGELOG.md)。

### 素材維護

原始圖片與設計保留，網站引用預先產生的 WebP。更新原圖後，以 Node 22 執行 `npm ci`、`npm run images:optimize`；一併提交 WebP 與 `qa/image-sizes.json`，一般發布不會即時轉圖。圖片來源與輸出清單在 `scripts/image-sources.json`。之後執行原本的 `npm run build`，同步發布 `docs/`。

</details>

[QA 紀錄](QA_CHANGELOG.md) · [介面設計規範](DESIGN_GUIDELINES.md)
