# 目錄

- [目錄](#目錄)
  - [摘要](#摘要)
    - [JS & TS](#js--ts)
    - [Vue](#vue)
    - [其他](#其他)
  - [詳細](#詳細)
    - [AssemblyScript](#assemblyscript)
    - [生命週期](#生命週期)
      - [Vue生命週期 比較表](#vue生命週期-比較表)
      - [參考資料](#參考資料)
    - [virtual DOM](#virtual-dom)
    - [Compiler-Informed Virtual DOM](#compiler-informed-virtual-dom)

## 摘要

### JS & TS

| 問 | 答 | 其他 |
|  ---  |  ---  |  ---  |
|  Typescript的優勢?  | 強型別JS，開發時如果有好好定義type、interface，TS會幫你檢查型別   |   |
|  Typescript編譯時的性能消耗?  |  TS最後還是會編譯成JS，隨著專案規模變大，編譯的時間也會越長。但仍可以使用[project reference](readfog.com/a/1676964468356124672)來解決編譯時間過長的問題。然而隨著[WebAssembly](https://webassembly.org/)和[AssemblyScript](https://www.assemblyscript.org/)的出現，未來或許能解決這個問題 | [AssemblyScript](#assemblyscript)  |

### Vue

| 問 | 答 | 其他 |
|  ---  |  ---  |  ---  |
|  Vue的生命週期  |  (太長，看下面)  | [生命週期](#生命週期) |
|  v-model取代MVC哪個部分?  | MVC可以用在前、後端。當用在前端時，Model，與資料介接的地方，負責去向 DB 撈取資料。View，畫面。`Controller，因為它負責View與Model間的溝通`  |   |
|  data為什麼是function?  |  避免每個component的instance共用同一個物件，導致各個組件的資料互相影響  |   |
|  為什麼v-for要key?  |  [key](https://vuejs.org/api/built-in-special-attributes.html#key)可視為DOM的身分證，`用於diff算法辨別畫面哪些地方需要更新`。如果沒有設置key，Vue會使用一種最小化元素的移動、盡可能重複使用元素的演算法。如果有key，會根據key的順序變化來重新排列元素(或者說改變其內容)，所以那些元素不會被消滅，也就`減少了操作DOM的成本`  |   |
|  v-for和v-if為何不能一起用?  |  v-if優先級高於v-for，用computed過濾完的資料來跑v-for比較好  |   |
|  virtual DOM是甚麼?  |  用於模擬DOM的JS物件。virtual DOM會在資料有改變時產生新的virtual DOM，然後比較新舊差異，再挑有改變的地方渲染，減少不必要的DOM操作，因此當專案規模大時virtual DOM的效能會比直接操作DOM好很多  | [virtual DOM](#virtual-dom)、[Vue - virtual dom](https://vuejs.org/guide/extras/rendering-mechanism.html#virtual-dom)  |
|  阻止event bubbling用甚麼修飾符?  |  stop  | 如果是原生JS，用event.stopPropagation()  |
|  self、stop、capture的差異?  |  stop，停止觸發父層事件。self，只有動到該DOM元素本身才會觸發事件。capture，當發生冒泡時先觸發有capture的事件  |   |
|  vue2 filter的功能?  |  攔截資料再額外處理，可以用function替代，所以vue3廢棄了  |   |
|  vue-cli怎麼打包的?  |    |   |

### 其他

| 問 | 答 | 其他 |
|  ---  |  ---  |  ---  |
|  MVVM是甚麼?  |  軟體架構模式，`有助於畫面和邏輯的切分`。Model，資料（變數）。View，畫面。`ViewModel，資料連結器`。而[Vue關注於VM層](https://012.vuejs.org/images/mvvm.png)，它會將V、M進行雙向綁定  | [MVVM 的概念](https://medium.com/neptune-coding/vue-js-mvvm-%E7%9A%84%E6%A6%82%E5%BF%B5-983bdc5da207)  |
|  不打request的情況下，如何不要刷新vuex的state，例如使用者的名稱跟頭貼不要重新抓?  |  存localStorage、session storage、cookie(現在限制多，基本上不用了)  |   |
|  request打出去前，如果要加上handling和cookie，如何做(例如用於打API時headers裡需要token)?  |  使用[axios](https://ithelp.ithome.com.tw/articles/10263166)管理API  |   |

## 詳細

### AssemblyScript

[AssemblyScript vs TypeScript](https://leanylabs.com/blog/assemblyscript-intro/#assemblyscript-vs-typescript)

[AssemblyScript](https://www.assemblyscript.org/)不只是Typescript轉WebAssembly的編譯器。因為多數現存的TS code不能跑，因為有一些重大的限制

> AssemblyScript is not just TypeScript to WebAssembly compiler. Most of the existing TypeScript code won’t work, as there are some substantial limitations.

和TS比起來WebAssembly的基本型別很不同，因為number不再是number，而拆成integer和floating-point。這樣表達給CPU會更精確，因此會更快。JS及時編譯會試圖根據變數的值找出該給一個型別為number的變數甚麼型別，並重新編譯數次。有了AssemblyScript開發者能夠得到進一步控制權，去定義型別。

> The basic types are quite different from TypeScript, as it directly exposes all integer and floating-point types available in WebAssembly. Those types more accurately represent the registries in the CPU, thus, are much faster. JavaScript JIT tries to figure out which type to use for number type based on values it contains, possibly recompiling the code multiple times. With AssemblyScript, developers have full control here and must specify the ideal types in advance.

WebAssembly也不支援聯合型別(ex: string | boolean)，因為它有一個固定的記憶體模型。optional argument、optional properties(ex:age?:number)、any也不在能夠使用。
雖然仍然可以用預設值(a: int32 = 0)來定義optional argument。所有物件都是靜態的，所以其屬性不能任意改變、刪減。

> Union types like string | boolean are also not supported as WebAssembly has a fixed memory model. Optional arguments and properties like firstName?: string and any aren’t available either. You can still use default values a: int32 = 0 to specify optional arguments, though. All objects are also statically typed and don’t allow to change their properties dynamically.

在沙盒外module不能操作DOM、外部API。你必須使用JS、import和export。WebAssembly互操作性目前只限於基本型別，物件型別還不行。
解決方法是自己造一個wrapper來手動存取module裡的記憶體。AssemblyScript的loader提供了一些基本功能可以用。

> Modules don’t have access to DOM and other external APIs out-of-the-box. You have to call JavaScript and vice-versa with import & export. Interoperability is limited to fundamental numeric values for now, and objects cannot flow in and out of WebAssembly yet. The workaround is to write custom wrappers to access pointers in the module’s memory manually. AssemblyScript’s loader provides some basic functionality to help you with that.

在WebAssembly你不該比較兩個不同型別的值，因此JS的==和===在強型別的WebAssembly可以說是狗屁不通。
在WebAssembly==相當於JS的===，===則是完全地比較，它只在兩個物件(傳址的角度)完全相等時才回傳true。
在JS或TS的開發的場合，多數會使用===的狀況可能不再適用，這可能會讓人很疑惑

> The JavaScript’s == and === operators don’t have much sense in strictly typed WebAssembly where you just can’t compare values of different types. In AssemblyScript == acts as JavaScript’s ===, while === performs an identity comparison returning true only if both operands are exactly the same object. It can be very confusing for someone with a JavaScript or TypeScript background, where using === is a common practice for the vast majority of cases.

WebAssembly目前不支援Exception、閉包，所以不能使用它。但你可以重寫你的(JS或TS)code，避免用這些東西。
因為它們被認為是關鍵的功能，所以目前(WebAssembly的)開發團隊正在試圖實作它們。
在這篇文發布時(2021/2/6)這個計畫仍在測試階段，你可以裝測試版來試試

> Exceptions aren’t supported in WebAssembly yet, so you can’t use them in AssemblyScript. Closures aren’t available either, but you can always rewrite the code to avoid using them. Since they are considered a critical language feature, the team is working to implement them ahead of the WebAssembly support. At the time of writing, it’s still in beta and limited to read-only captures. You can try it out with

```bash
npm install assemblyscript-closures-beta
```

### 生命週期

![Vue2 life cycle](https://v2.vuejs.org/images/lifecycle.png)
圖片取自[Vue2官網](https://v2.vuejs.org/v2/guide/instance.html)

![Vue3 life cycle](https://vuejs.org/assets/lifecycle.16e4c08e.png)
圖片取自[Vue3官網](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)

- beforeCreate

Vue實例(instance)被初始化，但[options](https://vuejs.org/api/options-state.html)在此階段還不能使用

> Called immediately when the instance is initialized, after props resolution, before processing other options such as data() or computed

compositon API的 `setup` hook會beforeCreate被呼叫

> setup() hook of Composition API is called before any Options API hooks, even beforeCreate().

- created

此階段`options、響應式系統會被設置好`，但`$el`還沒`未被設為#app或組件的template`

> When this hooks is called, the following have been set up: reactive data, computed properties, methods, and watchers. However, the mounting phase has not been started, and the $el property will not be available yet.

- beforeMount

DOM上的`節點還沒被建立`

> When this hook is called, the component has finished setting up its reactive state, but no DOM nodes have been created yet. It is about to execute its DOM render effect for the first time.

`server side render`時此hook`不會被呼叫`

- mounted

此階段DOM已被掛載好，可以操作了

`如果`是要`抓資料渲染到畫面`的話，盡量`不要在此`階段，而在created，因為DOM已被掛載，所以`可能`導致畫面`沒重渲染到`

Vue component會在以下條件達成後被掛載

1. 所有同步的子層的component都被掛載好了
2. DOM tree已經被建立，並放到父層

`server side render`時此hook`不會被呼叫`

- beforeUpdate

因為Vue component reactive state改變，而要`更新DOM tree前`呼叫

可用於取得被Vue更新前的Dom tree、修改component的狀態

> This hook can be used to access the DOM state before Vue updates the DOM. It is also safe to modify component state inside this hook.

`server side render`時此hook`不會被呼叫`

- update

`DOM tree更新完後`呼叫

父層的update會在子層的update後被呼叫

`不要在update去修改component狀態`，這可能`導致update被不停地呼叫`

- beforeDestroy / beforeUnmount

Vue component要被unmount前呼叫，但此時Vue instance還是有功能的

`server side render`時此hook`不會被呼叫`

- destroyed / unmounted

當unmounted被呼叫時，Vue component已被unmounted
可以透過這個hook手動`清除副作用(side effects)`，例如計時器(timer)、DOM事件監聽、server連線

unmounted有以下條件

1. 所有子層的component都被unmounted了
2. 所有響應式API(reactive effects)都停了
 All of its associated reactive effects (render effect and computed / watchers created during setup()) have been stopped.

- activated

`server side render`時此hook`不會被呼叫`

- deactivated

`server side render`時此hook`不會被呼叫`

- serverPrefetch

非同步函式完成畫面才被渲染

如果這個hook回傳一個Promise，server render會等到Promise的狀態確定後才渲染

只有`server side render`時`會被呼叫`

#### Vue生命週期 比較表

| Vue2 / 3 | Vue2 / 3 composition API | 說明 |
| -------- | -------- | -------- |
|   beforeCreate    |   setup   |  Vue實例(instance)被初始化    |
|   created   |  setup   |  [options](https://vuejs.org/api/options-state.html)設置完成   |
|   beforeMount    |  onBeforeMount   |  template被編譯了，但還未掛載到this.$el    |
|   mounted    |  onMounted   |  模板(#app或者組件的template)被掛載上this.$el  |
|   beforeUpdate    |  onBeforeUpdate    |   資料變動使得畫面更新前   |
|   updated    |   onUpdated   | 資料變動使得畫面更新 |
|   beforeDestroy / beforeUnmount   |  onBeforeUnmount   |   最後一個可以透過this操作Vue實例的hook   |
|   destroyed / unmounted |   onUnmounted   |  可以在此hook清除計時器、移除JS事件監聽  |
|   errorCaptured    |   onErrorCaptured   |  捕捉子/孫層的錯誤   |
|   activated    |   ×   |   component被插進DOM tree時觸發，配合\<keep-alive>使用   |
|    deactivated   |   ×   | component由DOM tree移除時觸發，配合\<keep-alive>使用     |
|   × / serverPrefetch  |   onServerPrefetch    |  唯一在SSR才觸發的hook。非同步完成才渲染    |

#### 參考資料

[Vue - Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
[Options: Lifecycle](https://vuejs.org/api/options-lifecycle.html)
[Vue - API Reference](https://vuejs.org/api/)
[A Complete Guide to Vue Lifecycle Hooks - with Vue 3 Updates](https://learnvue.co/tutorials/vue-lifecycle-hooks-guide)
[Vue 實體的生命週期](https://ithelp.ithome.com.tw/articles/10202949)
[風味沙拉 - 有機發酵生命週期](https://www.youtube.com/watch?v=aT9mP9vz3AY&ab_channel=Alex%E5%AE%85%E5%B9%B9%E5%98%9B)

### virtual DOM

[DOM 和 Virtual DOM 是什麼？](https://tw.alphacamp.co/blog/dom-and-virtual-dom)

- DOM是如何運作的

    DOM，瀏覽器所產並存在在瀏覽器中的`資料結構`

    1. 使用者在網址列輸入網址
    2. 透過 DNS server 找到 IP address
    3. 建立 TCP/IP 連線 (3-way handshake)
    4. 通訊連線確認之後建立，就會正式送出 HTTP 請求
    5. 收到 HTTP response 後，若確認內容為 HTTP 文件，就交給 Chrome 當中的 render process 來處理畫面的呈現，render process 也會開始下載相關資源
    6. 產生tree
       a. 會將 HTML 轉換成 DOM tree
       b. 瀏覽器根據 CSS 文件上的內容，計算樣式並放到DOM元素上，過程中產出CSSOM tree
    7. 將DOM tree和CSSOM tree混合變成render tree，瀏覽器不會在render tree完成前繪製畫面

- virtual DOM是如何運作的

    ![how does virtual DOM works](https://vuejs.org/assets/render-pipeline.03805016.png)

    virtual DOM是`JS物件`，在Vue時就是vnode，它被存在在記憶體中。其`能避免`而產生`不必要的reflow 或 repaint`，故能提高效能

    virtual DOM的運作分成3個階段

    1. compile  
      Vue template會被編譯成render function，render function會回傳virtual DOM tree

    2. mount  
      執行環境(此指瀏覽器)渲染器(runtime renderer)會走訪virtual DOM tree，然後根據它建立DOM

    3. patch/diffing  
      資料變動時，Vue會先建一個新的virtual DOM tree，然後`diff算法`會`比較`新舊的`差別`，最後`只操作需要變動的DOM`


### Compiler-Informed Virtual DOM

  需要注意的是，傳統的virtual DOM儘管有virtual DOM tree有些部分沒有改變，`每次重新渲染時新的vnode`還是會`被建立`，所以會`犧牲`了一些`記憶體
  > even if a part of the tree never changes, new vnodes are always created for them on each re-render

  但Vue以Compiler-Informed Virtual DOM解決了記憶體問題

  Vue可以控制編譯器、執行環境(runtime)，這讓我們可以使用不少原本只有渲染器可以利用的編譯期優化(compile-time optimization)方法

  編譯器會對template進行靜態分析，並在產出的程式碼中留下一下線索(hints)，因此執行環境可以拿線索去走捷徑

  當然如果需要也可以直接用render function
