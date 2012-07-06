#pragma strict

var targetFilename : String;
var urlBase : String;

private var clip : AudioClip;
private var message = "";

private function GetCachedFilePath() {
    return System.IO.Path.Combine(Application.temporaryCachePath, targetFilename);
}

private function TryLoadAndPlay() {
    var cachePath = GetCachedFilePath();
    
    message += "Checking cached file (" + cachePath + ")\n";
    var www = WWW("file:" + cachePath);
    
    yield www;

    if (www.error) {
        message += "Not found ("  + www.error + ")\n";
    } else {
        clip = www.GetAudioClip(false, true, AudioType.MPEG);
        message += "Now playing.\n";
        while (true) {
            audio.PlayOneShot(clip);
            yield WaitForSeconds(clip.length);
        }
    }
}


function Start() {
    yield TryLoadAndPlay();
    
    message += "Downloading (" + urlBase + targetFilename + ")\n";
    var www = WWW(urlBase + targetFilename);
    yield www;
    
    if (www.error) {
        message += "Can't download ("  + www.error + ")\n";
    } else {
        message += "Writing to the cache.\n";
        System.IO.File.WriteAllBytes(GetCachedFilePath(), www.bytes);
        
        yield TryLoadAndPlay();
    }
}

function OnGUI() {
    GUILayout.Label(message);
}
