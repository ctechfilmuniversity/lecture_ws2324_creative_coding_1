using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace com.artbymarek.experiments.circles {
    
}
public class Circles : MonoBehaviour {
    public int segments;
    public float innerRadius;
    public float thickness;
    public float jiggle;
    
    public void Initialize(int segments, float innerRadius, float thickness) {
        this.segments = segments;
        this.innerRadius = innerRadius;
        this.thickness = thickness;
        jiggle = 0.3f;
    }
    
    void Start() {
        GenerateRingMesh();
    }

// Update is called once per frame
    void Update() {
        
    }
    //Generate mesh out of vertices
    public Mesh GenerateRingMesh() {
        Mesh mesh = new Mesh();

        //Thanks to ChatGTP:
        Vector3[] vertices = new Vector3[segments * 2];
        int[] triangles = new int[segments * 6];

        float deltaAngle = 2 * Mathf.PI / segments;
        for (int i = 0; i < segments; i++) {
            float angle = i * deltaAngle;
            float x = Mathf.Cos(angle);
            float y = Mathf.Sin(angle);

            vertices[i * 2] = new Vector3(x * innerRadius, y * innerRadius, 0);
            vertices[i * 2 + 1] = new Vector3(x * (innerRadius + thickness), y * (innerRadius + thickness), 0);

            int triIndex = i * 6;
            triangles[triIndex] = i * 2;
            triangles[triIndex + 1] = (i * 2 + 2) % (segments * 2);
            triangles[triIndex + 2] = i * 2 + 1;

            triangles[triIndex + 3] = i * 2 + 1;
            triangles[triIndex + 4] = (i * 2 + 2) % (segments * 2);
            triangles[triIndex + 5] = (i * 2 + 3) % (segments * 2);
        }

        mesh.vertices = vertices;
        mesh.triangles = triangles;

        mesh.RecalculateBounds();
        mesh.RecalculateNormals();

        return mesh;
    }
    
    public void RegenerateMesh() {
        MeshFilter meshFilter = GetComponent<MeshFilter>();
        if (meshFilter != null) {
            meshFilter.mesh = GenerateRingMesh();
        } else {
            Debug.LogError("MeshFilter component not found!");
        }
    }
    
    public void JiggleMesh() {
        
        Mesh mesh = this.GetComponent<MeshFilter>().mesh; //_meshFilter.mesh;
        Vector3[] vertices = mesh.vertices;

        for (int i = 0; i < vertices.Length; i++) {
            //Debug.Log("jiggle is " + jiggle);
                
            float random = Random.Range(-jiggle, jiggle);
            //float random = Random.Range(-0.01f, 0.01f);
            //Debug.Log("random" + random);
            vertices[i] += new Vector3(random, 0, 0);
        }

        mesh.vertices = vertices;
        mesh.RecalculateBounds();
        mesh.RecalculateNormals();
    }

}