using System;
using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using Random = UnityEngine.Random;


public class Cubes : MonoBehaviour {
    private GameObject _obj;
    public List<GameObject> objList = new List<GameObject>();
    private float _timer = 0.0f;
    private float _delay = 0.1f;
    public const int MaxCubeRow = 5;

    private Boolean color1;
    private Boolean color2;
    private Boolean color3;

    private GameObject[,,] _cubeArray3D;
    private int x_select_start;
    private int x_select_end;
    private int y_select_start;
    private int y_select_end;
    private int z_select_start;
    private int z_select_end;

    private void Awake() {
        CreateCubes();
    }

    private void Start() {
        x_select_start = 1;
        x_select_end = 1;
        y_select_start = 1;
        y_select_end = 1;
        z_select_start = 1;
        z_select_end = 1;
    }

    private void Update() {
        MoveCubes();

        //only do this if slider is changed or button was pressed
        if (color1) changeToColor1();
        if (color2) changeToColor2();
        if (color3) changeToColor3();
        //scaleDown();
    }

    public void Button1() {
        Debug.Log("button 1 clicked");
        changeToColor1();
        color1 = true;
        color2 = false;
        color3 = false;
    }

    public void Button2() {
        Debug.Log("button 2 clicked");
        scaleDown();
    }

    public void Button3() {
        Debug.Log("button 3 clicked");
        scaleUp();
    }

    public void Button4() {
        Debug.Log("button 4 clicked");
        spinRight();
    }

    public void Button5() {
        Debug.Log("button 5 clicked");
        changeToColor2();
        color1 = false;
        color2 = true;
        color3 = false;
    }

    public void Button6() {
        Debug.Log("button 6 clicked");
        spinLeftAndGravityOff();
    }

    public void Button7() {
        Debug.Log("button 7 clicked");
        forceUpAndGravityOff();
    }

    public void Button8() {
        Debug.Log("button 8 clicked");
        gravityOn();
    }

    public void Button9() {
        Debug.Log("button 9 clicked");
        changeToColor3();
        color1 = false;
        color2 = false;
        color3 = true;
    }


    public void Select_X_Row(Vector2 sliderValue) {
        x_select_start = (int) sliderValue.x;
        x_select_end = (int) sliderValue.y;
        // Debug.Log("x slider changed");
        Debug.Log("x_select_start:" + x_select_start);
        Debug.Log("x_select_end:" + x_select_end);

        // Debug.Log(x_select_end);
        // Debug.Log(sliderValue.x);
    }

    public void Select_Y_Row(Vector2 sliderValue) {
        y_select_start = (int) sliderValue.x;
        y_select_end = (int) sliderValue.y;
        Debug.Log("y_select_start:" + y_select_start);
        Debug.Log("y_select_end:" + y_select_end);
    }

    public void Select_Z_Row(Vector2 sliderValue) {
        z_select_start = (int) sliderValue.x;
        z_select_end = (int) sliderValue.y;
        Debug.Log("z_select_start:" + z_select_start);
        Debug.Log("z_select_end:" + z_select_end);
    }

    private void CreateCubes() {
        _cubeArray3D = new GameObject[MaxCubeRow, MaxCubeRow, MaxCubeRow];

        //store all cubes in a 3d array. Better here than a jagged array
        for (int x = 0; x < MaxCubeRow; x++) {
            for (int y = 0; y < MaxCubeRow; y++) {
                for (int z = 0; z < MaxCubeRow; z++) {
                    _obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
                    _obj.transform.position = new Vector3(x, y, z);
                    _obj.AddComponent<Rigidbody>();
                    _obj.GetComponent<Rigidbody>().useGravity = false;

                    // Use a shader that's designed for transparency
                    Material transparentMaterial = new Material(Shader.Find("Legacy Shaders/Transparent/Diffuse"));
                    transparentMaterial.color = new Color(1f, 1f, 1f, 0.3f); // Set alpha to 0.05 for high transparency

                    Renderer renderer = _obj.GetComponent<Renderer>();
                    renderer.material = transparentMaterial;

                    _cubeArray3D[x, y, z] = _obj;
                }
            }
        }


        // for (int x = 0; x < MaxCubeRow; x = x + 1) {
        //     for (int y = 0; y < MaxCubeRow; y = y + 1) {
        //         for (int z = 0; z < MaxCubeRow; z = z + 1) {
        //             _obj = GameObject.CreatePrimitive(PrimitiveType.Cube);
        //             //_obj.transform.localScale = new Vector3(0.8f, 0.8f, 0.8f);
        //             //_obj.GetComponent<BoxCollider>().size = new Vector3(0.8f, 0.8f, 0.8f);
        //             //_obj.transform.position = new Vector3(x, y, z);
        //             _obj.transform.position = new Vector3(x, y, z);
        //             _obj.AddComponent<Rigidbody>();
        //             _obj.GetComponent<Rigidbody>().useGravity = false;
        //             //_obj.GetComponent<Rigidbody>().isKinematic = true; //deactivate physics first
        //
        //             // Material transparentMaterial = new Material(Shader.Find("Standard"));
        //             // transparentMaterial.color = Color.white;
        //             // transparentMaterial.SetFloat("_Alpha", 0.05f); // Set the alpha value to 0.5, making the object half transparent
        //             // Renderer renderer = _obj.GetComponent<Renderer>();
        //             // renderer.material = transparentMaterial;
        //
        //
        //             // Renderer renderer = _obj.GetComponent<Renderer>();
        //             //  float r = 0.9f + x * 3 / 15f;
        //             //  float g = 0.1f + y * 4 / 15;
        //             //  float b = 0.5f + z * 2 / 15;
        //             //  renderer.material.color = new Color(r, g, b, 0.05f);
        //             //renderer.enabled = false;
        //             //objList.Add(_obj);
        //             //UpdateAllVertices(obj);
        //             _cubeArray3D[x, y, z] = _obj;
        //         }
        //     }
        // }
    }

    private void changeToColor1() {
        //the values should already be safe between 0-4 but perhaps it can happen that we have 4 start and 4 end...? Would that block something?
        //the clamp will avoid this
        int startX = Mathf.Clamp(x_select_start - 1, 0, MaxCubeRow - 1);
        int endX = Mathf.Clamp(x_select_end, 0, MaxCubeRow);
        int startY = Mathf.Clamp(y_select_start - 1, 0, MaxCubeRow - 1);
        int endY = Mathf.Clamp(y_select_end, 0, MaxCubeRow);
        int startZ = Mathf.Clamp(z_select_start - 1, 0, MaxCubeRow - 1);
        int endZ = Mathf.Clamp(z_select_end, 0, MaxCubeRow);

        for (int x = startX; x < endX; x++) {
            for (int y = startY; y < endY; y++) {
                for (int z = startZ; z < endZ; z++) {
                    GameObject obj = _cubeArray3D[x, y, z];
                    Renderer renderer = obj.GetComponent<Renderer>();
                    renderer.material.color = Color.blue;
                }
            }
        }
    }

    private void changeToColor2() {
        //the values should already be safe between 0-4 but perhaps it can happen that we have 4 start and 4 end...? Would that block something?
        //the clamp will avoid this
        int startX = Mathf.Clamp(x_select_start - 1, 0, MaxCubeRow - 1);
        int endX = Mathf.Clamp(x_select_end, 0, MaxCubeRow);
        int startY = Mathf.Clamp(y_select_start - 1, 0, MaxCubeRow - 1);
        int endY = Mathf.Clamp(y_select_end, 0, MaxCubeRow);
        int startZ = Mathf.Clamp(z_select_start - 1, 0, MaxCubeRow - 1);
        int endZ = Mathf.Clamp(z_select_end, 0, MaxCubeRow);

        for (int x = startX; x < endX; x++) {
            for (int y = startY; y < endY; y++) {
                for (int z = startZ; z < endZ; z++) {
                    GameObject obj = _cubeArray3D[x, y, z];
                    Renderer renderer = obj.GetComponent<Renderer>();
                    renderer.material.color = new Color(0.8f, 0.4f, 0);
                }
            }
        }
    }

    private void changeToColor3() {
        //the values should already be safe between 0-4 but perhaps it can happen that we have 4 start and 4 end...? Would that block something?
        //the clamp will avoid this
        int startX = Mathf.Clamp(x_select_start - 1, 0, MaxCubeRow - 1);
        int endX = Mathf.Clamp(x_select_end, 0, MaxCubeRow);
        int startY = Mathf.Clamp(y_select_start - 1, 0, MaxCubeRow - 1);
        int endY = Mathf.Clamp(y_select_end, 0, MaxCubeRow);
        int startZ = Mathf.Clamp(z_select_start - 1, 0, MaxCubeRow - 1);
        int endZ = Mathf.Clamp(z_select_end, 0, MaxCubeRow);

        for (int x = startX; x < endX; x++) {
            for (int y = startY; y < endY; y++) {
                for (int z = startZ; z < endZ; z++) {
                    GameObject obj = _cubeArray3D[x, y, z];
                    Renderer renderer = obj.GetComponent<Renderer>();
                    renderer.material.color = new Color(0.2f, 0.8f, 0.7f);
                }
            }
        }
    }

    private void scaleDown() {
        //the values should already be safe between 0-4 but perhaps it can happen that we have 4 start and 4 end...? Would that block something?
        //the clamp will avoid this
        int startX = Mathf.Clamp(x_select_start - 1, 0, MaxCubeRow - 1);
        int endX = Mathf.Clamp(x_select_end, 0, MaxCubeRow);
        int startY = Mathf.Clamp(y_select_start - 1, 0, MaxCubeRow - 1);
        int endY = Mathf.Clamp(y_select_end, 0, MaxCubeRow);
        int startZ = Mathf.Clamp(z_select_start - 1, 0, MaxCubeRow - 1);
        int endZ = Mathf.Clamp(z_select_end, 0, MaxCubeRow);

        for (int x = startX; x < endX; x++) {
            for (int y = startY; y < endY; y++) {
                for (int z = startZ; z < endZ; z++) {
                    GameObject obj = _cubeArray3D[x, y, z];
                    Vector3 vecOld = obj.transform.localScale;
                    //Vector3 vec = new Vector3();
                    vecOld = vecOld * 0.7f;
                    if (vecOld.x < 0.3f) {
                        vecOld = new Vector3(0.3f, 0.3f, 0.3f);
                    }

                    obj.transform.localScale = vecOld;
                }
            }
        }
    }

    private void scaleUp() {
        //the values should already be safe between 0-4 but perhaps it can happen that we have 4 start and 4 end...? Would that block something?
        //the clamp will avoid this
        int startX = Mathf.Clamp(x_select_start - 1, 0, MaxCubeRow - 1);
        int endX = Mathf.Clamp(x_select_end, 0, MaxCubeRow);
        int startY = Mathf.Clamp(y_select_start - 1, 0, MaxCubeRow - 1);
        int endY = Mathf.Clamp(y_select_end, 0, MaxCubeRow);
        int startZ = Mathf.Clamp(z_select_start - 1, 0, MaxCubeRow - 1);
        int endZ = Mathf.Clamp(z_select_end, 0, MaxCubeRow);

        for (int x = startX; x < endX; x++) {
            for (int y = startY; y < endY; y++) {
                for (int z = startZ; z < endZ; z++) {
                    GameObject obj = _cubeArray3D[x, y, z];
                    Vector3 vecOld = obj.transform.localScale;
                    //Vector3 vec = new Vector3();
                    vecOld = vecOld * 1.1f;
                    if (vecOld.x > 2.1f) {
                        vecOld = new Vector3(2.1f, 2.1f, 2.1f);
                    }

                    obj.transform.localScale = vecOld;
                }
            }
        }
    }

    private void spinRight() {
        //the values should already be safe between 0-4 but perhaps it can happen that we have 4 start and 4 end...? Would that block something?
        //the clamp will avoid this
        int startX = Mathf.Clamp(x_select_start - 1, 0, MaxCubeRow - 1);
        int endX = Mathf.Clamp(x_select_end, 0, MaxCubeRow);
        int startY = Mathf.Clamp(y_select_start - 1, 0, MaxCubeRow - 1);
        int endY = Mathf.Clamp(y_select_end, 0, MaxCubeRow);
        int startZ = Mathf.Clamp(z_select_start - 1, 0, MaxCubeRow - 1);
        int endZ = Mathf.Clamp(z_select_end, 0, MaxCubeRow);

        for (int x = startX; x < endX; x++) {
            for (int y = startY; y < endY; y++) {
                for (int z = startZ; z < endZ; z++) {
                    //GameObject obj = _cubeArray3D[x, y, z];

                    // Assuming x, y, z are defined as the force components
                    float torqueX = Random.Range(0f, 0f);
                    float torqueY = Random.Range(0f, 1f);
                    float torqueZ = Random.Range(0f, 0f);

                    _cubeArray3D[x, y, z].GetComponent<Rigidbody>()
                        .AddTorque(new Vector3(torqueX, torqueY, torqueZ) * 32f);
                }
            }
        }
    }

    private void spinLeftAndGravityOff() {
        //the values should already be safe between 0-4 but perhaps it can happen that we have 4 start and 4 end...? Would that block something?
        //the clamp will avoid this
        int startX = Mathf.Clamp(x_select_start - 1, 0, MaxCubeRow - 1);
        int endX = Mathf.Clamp(x_select_end, 0, MaxCubeRow);
        int startY = Mathf.Clamp(y_select_start - 1, 0, MaxCubeRow - 1);
        int endY = Mathf.Clamp(y_select_end, 0, MaxCubeRow);
        int startZ = Mathf.Clamp(z_select_start - 1, 0, MaxCubeRow - 1);
        int endZ = Mathf.Clamp(z_select_end, 0, MaxCubeRow);

        for (int x = startX; x < endX; x++) {
            for (int y = startY; y < endY; y++) {
                for (int z = startZ; z < endZ; z++) {
                    GameObject obj = _cubeArray3D[x, y, z];
                    Rigidbody rb = obj.GetComponent<Rigidbody>();
                    // Enable gravity
                    rb.useGravity = false;
                    //GameObject obj = _cubeArray3D[x, y, z];

                    // Assuming x, y, z are defined as the force components
                    float torqueX = Random.Range(0f, 1f);
                    float torqueY = Random.Range(0f, 0f);
                    float torqueZ = Random.Range(0f, 1f);

                    _cubeArray3D[x, y, z].GetComponent<Rigidbody>()
                        .AddTorque(new Vector3(torqueX, torqueY, torqueZ) * 52f);
                }
            }
        }
    }

    private void forceUpAndGravityOff() {
        //the values should already be safe between 0-4 but perhaps it can happen that we have 4 start and 4 end...? Would that block something?
        //the clamp will avoid this
        int startX = Mathf.Clamp(x_select_start - 1, 0, MaxCubeRow - 1);
        int endX = Mathf.Clamp(x_select_end, 0, MaxCubeRow);
        int startY = Mathf.Clamp(y_select_start - 1, 0, MaxCubeRow - 1);
        int endY = Mathf.Clamp(y_select_end, 0, MaxCubeRow);
        int startZ = Mathf.Clamp(z_select_start - 1, 0, MaxCubeRow - 1);
        int endZ = Mathf.Clamp(z_select_end, 0, MaxCubeRow);

        for (int x = startX; x < endX; x++) {
            for (int y = startY; y < endY; y++) {
                for (int z = startZ; z < endZ; z++) {
                    GameObject obj = _cubeArray3D[x, y, z];
                    Rigidbody rb = obj.GetComponent<Rigidbody>();
                    // Enable gravity
                    rb.useGravity = false;
                    
                    // Assuming x, y, z are defined as the force components
                    _cubeArray3D[x, y, z].GetComponent<Rigidbody>()
                        .AddForce(new Vector3(0f, 1.2f, 0f) * 22f); // apply force in the (1,2,3) direction
                }
            }
        }
    }
    
    private void gravityOn() {
        //the values should already be safe between 0-4 but perhaps it can happen that we have 4 start and 4 end...? Would that block something?
        //the clamp will avoid this
        int startX = Mathf.Clamp(x_select_start - 1, 0, MaxCubeRow - 1);
        int endX = Mathf.Clamp(x_select_end, 0, MaxCubeRow);
        int startY = Mathf.Clamp(y_select_start - 1, 0, MaxCubeRow - 1);
        int endY = Mathf.Clamp(y_select_end, 0, MaxCubeRow);
        int startZ = Mathf.Clamp(z_select_start - 1, 0, MaxCubeRow - 1);
        int endZ = Mathf.Clamp(z_select_end, 0, MaxCubeRow);

        for (int x = startX; x < endX; x++) {
            for (int y = startY; y < endY; y++) {
                for (int z = startZ; z < endZ; z++) {
                    GameObject obj = _cubeArray3D[x, y, z];
                    Rigidbody rb = obj.GetComponent<Rigidbody>();
                    // Enable gravity
                    rb.useGravity = true;
                    
                    // Assuming x, y, z are defined as the force components
                    _cubeArray3D[x, y, z].GetComponent<Rigidbody>()
                        .AddForce(new Vector3(0f, 1.2f, 0f) * 22f); // apply force in the (1,2,3) direction
                }
            }
        }
    }


    private void MoveCubes() {
        _timer += Time.deltaTime;
        if (_timer > _delay) {
            foreach (var gameObject in _cubeArray3D) {
                //gameObject.GetComponent<Rigidbody>().isKinematic = false;
                //gameObject.GetComponent<Rigidbody>().AddForce(_obj.transform.forward * 200f);
            }

            int ranNum_x = (int) Random.Range(0, MaxCubeRow - 1);
            int ranNum_y = (int) Random.Range(0, MaxCubeRow - 1);
            int ranNum_z = (int) Random.Range(0, MaxCubeRow - 1);

            //Rigidbody rb;
            //rb.AddForce();
            //_objList[ranNum].GetComponent<Rigidbody>().AddForce(_obj.transform.up * 20f);
            // float x = Random.Range(0, 0.4f);
            // float y = Random.Range(0, 1f);
            // float z = Random.Range(0, 1.2f);
            float x = Random.Range(0, 0.04f);
            float y = Random.Range(0, 0.01f);
            float z = Random.Range(0, 0.012f);

            //_objList[ranNum].GetComponent<Rigidbody>().AddForce(new Vector3(x, y, z) * 20f); // apply force in the (1,2,3) direction
            _cubeArray3D[ranNum_x, ranNum_y, ranNum_z].GetComponent<Rigidbody>()
                .AddForce(new Vector3(x, y, z) * 22f); // apply force in the (1,2,3) direction

            //ranNum = (int) Random.Range(0, _objList.Count - 1);
            //_objList[ranNum].GetComponent<Rigidbody>().AddForce(_obj.transform.forward * 20f);
            _timer = 0f;
        }
    }
}