using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace com.artbymarek.experiments.happy {
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
        GenerateMeshRing();
    }

// Update is called once per frame
    void Update() {
    }

    public Mesh GenerateMeshRing() {
        Mesh mesh = new Mesh();

        Vector3[] vertices = new Vector3[segments * 2];
        int[] triangles = new int[segments * 6];

        float deltaAngle = 2 * Mathf.PI / segments;
        for (int i = 0; i < segments; i++) {
            float angle = i * deltaAngle;
            float x = Mathf.Cos(angle);
            float y = Mathf.Sin(angle);

            // Invert the Y-coordinate to flip the mesh upside down
            vertices[i * 2] = new Vector3(x * innerRadius, -y * innerRadius, 0);
            vertices[i * 2 + 1] = new Vector3(x * (innerRadius + thickness), -y * (innerRadius + thickness), 0);

            int triIndex = i * 6;
            // Reverse the order of vertices in each triangle to flip the faces
            triangles[triIndex] = i * 2 + 1;
            triangles[triIndex + 1] = (i * 2 + 2) % (segments * 2);
            triangles[triIndex + 2] = i * 2;

            triangles[triIndex + 3] = (i * 2 + 3) % (segments * 2);
            triangles[triIndex + 4] = (i * 2 + 2) % (segments * 2);
            triangles[triIndex + 5] = i * 2 + 1;
        }

        mesh.vertices = vertices;
        mesh.triangles = triangles;

        mesh.RecalculateBounds();
        mesh.RecalculateNormals();

        return mesh;
    }


    //Generate mesh out of vertices
    public Mesh GenerateMeshHalfCircle() {
        Mesh mesh = new Mesh();
        Vector3[] vertices;
        int[] triangles;

        // Handle specific condition where segments is 1 or 2
        if (segments < 3) {
            vertices = new Vector3[2];
            triangles = new int[2];
            vertices[0] = new Vector3(innerRadius, 0, 0);
            vertices[1] = new Vector3(innerRadius + thickness, 0, 0);
            triangles[0] = 0;
            triangles[1] = 1;
        } else {
            // Adjust the number of vertices and triangles for a half-circle
            vertices = new Vector3[segments + 2];
            triangles = new int[segments * 3];

            // Half the angle as we are doing a half-circle
            float deltaAngle = Mathf.PI / segments;

            // First vertex at the center of the half-circle
            vertices[0] = new Vector3(0, 0, 0);
    
            for (int i = 0; i <= segments; i++) {
                float angle = Mathf.PI - (i * deltaAngle); // Start from PI to 0 to flip the half-circle
                float x = Mathf.Cos(angle);
                float y = Mathf.Sin(angle);

                // Flip along the X-axis
                vertices[i + 1] = new Vector3(x * (innerRadius + thickness), -y * (innerRadius + thickness), 0);

                // Skip the first and last segment for triangle creation
                if (i < segments) {
                    int triIndex = i * 3;
                    // Reverse the order of the vertices in the triangle to flip the normals
                    triangles[triIndex] = 0;
                    triangles[triIndex + 1] = i + 2;
                    triangles[triIndex + 2] = i + 1;
                }
            }
        }

        mesh.vertices = vertices;
        mesh.triangles = triangles;

        mesh.RecalculateBounds();
        mesh.RecalculateNormals();

        return mesh;
    }



    public void RegenerateMeshRing() {
        MeshFilter meshFilter = GetComponent<MeshFilter>();
        if (meshFilter != null) {
            meshFilter.mesh = GenerateMeshRing();
        } else {
            Debug.LogError("MeshFilter component not found!");
        }
    }
    
    public void RegenerateMeshHalfCircle() {
        MeshFilter meshFilter = GetComponent<MeshFilter>();
        if (meshFilter != null) {
            meshFilter.mesh = GenerateMeshHalfCircle();
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