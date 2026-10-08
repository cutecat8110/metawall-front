# Metawall - 社群內容牆 ( 前端 )

![Node](https://img.shields.io/badge/Node.js-v22.23.3-brightgreen.svg)
![Vue](https://img.shields.io/badge/Vue.js-v3-blue.svg)

> 這是一個充滿分享和互動的社交平台，讓你自由註冊、追蹤喜歡的用戶、留言與分享生活。在這裡，你可以盡情展現自我，並留下寶貴的回憶。

![](https://cutecat8110.github.io/metawall-front/demo.png)

## 📋 專案概述

此專案旨在增進獨立前後端開發能力，運用 Vue Options API、nodeJS 和 MongoDB 等技術。<br>開發API 設計反覆進行測試和防呆，以確保系統穩定與安全性。同時著重於切版與動效實現，以提升畫面品質與社交體驗。

- [後端](https://github.com/cutecat8110/metawall-back)
- [API 文件](https://metawall-backend-c89d.onrender.com/api-docs/)
- [Demo](https://cutecat8110.github.io/metawall-front/)

## 🌸 啟動、測試與部署

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

預覽路徑為 `/metawall-front/`。`.npmrc` 固定舊 Vue CLI 套件的 peer dependency 安裝方式，避免新 npm 的解析差異；未全面升級框架。

- `VUE_APP_API` 是 API 根網址；`.env` 指向現有 Render，`.env.local` 可覆寫。
- `VUE_APP_USER_PHOTO`、`VUE_APP_USER_PHOTO_2`、`VUE_APP_SIGN_BG` 為原始預設圖片的路徑，現隨網站發布於 `public/images/`，保留原圖片。會員上傳圖片仍使用原 Imgur URL。
- `VUE_APP_*` 會進入公開產物，不能放秘密。
- Vitest / Vue Test Utils 驗證操作、並行請求、路由與圖片事件。單元測試略過 SFC 樣式編譯；樣式由真正的 Vue CLI 正式建置及瀏覽器 RWD QA 驗證。
- 正式發布前移除本機 API 覆寫，確認 `VUE_APP_API` 為 Render 正式網址；`npm run build` 產生 `docs/`，GitHub Pages 使用 `portfolio/qa` 的 `/docs`。
- Render 免費後端可能冷啟動；等待上限 90 秒，失敗可手動重試，寫入不自動重送。
- 回復時先選回上一個成功的 Render 部署，再將 Pages 來源改回 `main` 的 `/docs`。本輪前基準提交 `18467ccda44851ba51d45e9ec869a04f693d422b`。

詳細修正與兩輪驗證請看 [QA_CHANGELOG.md](QA_CHANGELOG.md)。

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
