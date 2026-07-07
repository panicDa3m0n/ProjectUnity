using System.IO;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

public static class BootstrapSceneGenerator
{
    private const string ScenePath = "Assets/_Project/Scenes/Bootstrap.unity";

    [MenuItem("The Archive/Generate Bootstrap Scene")]
    public static void Generate()
    {
        Directory.CreateDirectory("Assets/_Project/Scenes");
        Directory.CreateDirectory("Assets/_Project/Prototype");

        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

        var cameraObject = new GameObject("Top Down Orthographic Camera");
        var camera = cameraObject.AddComponent<Camera>();
        camera.orthographic = true;
        camera.orthographicSize = 8f;
        camera.clearFlags = CameraClearFlags.SolidColor;
        camera.backgroundColor = new Color(0.05f, 0.06f, 0.07f);
        cameraObject.transform.position = new Vector3(0f, 12f, 0f);
        cameraObject.transform.rotation = Quaternion.Euler(90f, 0f, 0f);
        camera.tag = "MainCamera";

        var floor = GameObject.CreatePrimitive(PrimitiveType.Plane);
        floor.name = "Prototype Floor";
        floor.transform.localScale = new Vector3(2f, 1f, 2f);

        var player = GameObject.CreatePrimitive(PrimitiveType.Capsule);
        player.name = "Placeholder Player Avatar";
        player.transform.position = new Vector3(0f, 1f, 0f);

        var lightObject = new GameObject("Directional Light");
        var light = lightObject.AddComponent<Light>();
        light.type = LightType.Directional;
        light.intensity = 1.1f;
        lightObject.transform.rotation = Quaternion.Euler(50f, -30f, 0f);

        EditorSceneManager.SaveScene(scene, ScenePath);
        SetBuildScene(ScenePath);
        AssetDatabase.SaveAssets();
    }

    private static void SetBuildScene(string path)
    {
        EditorBuildSettings.scenes = new[]
        {
            new EditorBuildSettingsScene(path, true)
        };
    }
}
