class MiraxAIProduct {
  constructor(url, userId, cameraPermission, appId) {
    this.url = url;
    this.userId = userId;
    this.cameraPermission = cameraPermission;
    this.appId = appId;
    this.app_url = window.location.origin
  }


  receiveData(callback = null) {

    console.log("Data received by Mirax AI Product:");
    console.log("URL:", this.url);
    console.log("app url:", this.app_url);

    console.log("User ID:", this.userId);
    console.log("Camera Permission:", this.cameraPermission);
    console.log("App ID:", this.appId);

    const iframe = document.createElement("iframe");
    iframe.style.position = 'fixed';
    iframe.style.inset = 0;
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.style.border = 'none';
    iframe.allow = "allow-same-origin";

    // Append iframe to the document body
    document.body.appendChild(iframe);

    // Load content into the iframe
    iframe.onload = () => {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        const newElement = iframeDocument.createElement("div");
        newElement.textContent = "Data received: " + JSON.stringify(this);
        iframeDocument.body.appendChild(newElement);

        if (callback && typeof callback === 'function') {
          callback(null, " MiraxAI Data received successfully");
        }
      } catch (error) {
        console.error(" MiraxAI Error occurred while accessing the iframe content:", error.message);
        if (callback && typeof callback === 'function') {
          callback(error, null);
        }
      }
    };

    iframe.onerror = (error) => {
      console.error("MiraxAI Error occurred while loading the iframe:", error.message);
      if (callback && typeof callback === 'function') {
        callback(error, null);
      }
    };

    iframe.src = this.url;
  }
}

function sendDataToMiraxAIProduct(url, userId, cameraPermission, appId, callback) {
  const miraxAIProduct = new MiraxAIProduct(url, userId, cameraPermission, appId);
  miraxAIProduct.receiveData(callback);
}
