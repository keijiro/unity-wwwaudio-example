#pragma strict

var targetFilename : String;
var urlBase : String;

private var message = "";

function Start() {
    var url = urlBase + targetFilename;
#if UNITY_IPHONE
    url += "-ios";
#elif UNITY_ANDROID
    url += "-android";
#endif
    url += ".unity3d";
    
    message += "Downloading (" + url + ")";
    
    var www = WWW.LoadFromCacheOrDownload(url, 0);
    yield www;
    
    if (www.error) {
        message += "Error (" + www.error + ")\n";
    } else {
        audio.clip = www.assetBundle.mainAsset as AudioClip;
        audio.Play();
    }
}

function OnGUI() {
    GUILayout.Label(message);
}
