#pragma strict

@MenuItem("CUSTOM/Build Asset Bundle")
static function BuildAssetBundle() {
    var clip = AssetDatabase.LoadMainAssetAtPath("Assets/test.mp3") as AudioClip;
    var savePath = EditorUtility.SaveFilePanel("Save Asset Bundle", "", "", "unity3d");
#if UNITY_IPHONE 
    var buildTarget = BuildTarget.iPhone;
#elif UNITY_ANDROID
    var buildTarget = BuildTarget.Android;
#else
    var buildTarget = BuildTarget.WebPlayer;
#endif
    BuildPipeline.BuildAssetBundle(clip, [clip], savePath, 0, buildTarget);
}
