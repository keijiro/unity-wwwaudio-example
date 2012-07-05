#pragma strict

var targetFilename = "test.mp3";
var urlBase = "https://github.com/keijiro/unity-wwwaudio-example/raw/master/Data/";

private var message = "";

private function GetCachedFilePath() {
    return System.IO.Path.Combine(Application.temporaryCachePath, "test.mp3");
}

private function TryLoadAndPlay() {
    var cachePath = GetCachedFilePath();
    
    message += "Checking cached file. (" + cachePath + ")\n";
    var www = WWW("file:" + cachePath);
    
    yield www;

    if (www.error) {
        message += "Not found. ("  + www.error + ")";
    } else {
        audio.clip = www.GetAudioClip(false, false, AudioType.MPEG);
        audio.Play();
        message += "Now playing.\n";
    }
}


function Start() {
    yield TryLoadAndPlay();
    if (audio.clip) return;
    
    message += "Downloading...\n";
    var www = WWW("https://github.com/keijiro/unity-wwwaudio-example/raw/master/Data/test.mp3");
    yield www;
    
    message += "Writing to the cache.\n";
    System.IO.File.WriteAllBytes(GetCachedFilePath(), www.bytes);
    
    yield TryLoadAndPlay();
}

function OnGUI() {
    GUILayout.Label(message);
}
