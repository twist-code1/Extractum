export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if(message.action = 'SEND_ARTICLE_TO_BACKEND'){

    }
  }
)});

async function sendToBackend(articlePayload:unknown) {
  const response = await fetch("http://localhost:3000") 
}