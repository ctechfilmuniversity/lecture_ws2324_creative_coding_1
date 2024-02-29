using System.Collections.Generic;
using System.Globalization;
using com.artbymarek.dirmic;
using UnityEngine;

public class PlaceCubes : MonoBehaviour
{

    private AudioImporter _audioImporter;
    private List<GameObject> _cubes;

    private bool _audioLoaded;
    private bool _cubesPlaced;

    public List<Vector3> _positionsPrismMadeOfCubes; // List of positions


    private void Awake()
    {
        _audioImporter = this.gameObject.GetComponent<AudioImporter>();
    }

    private List<GameObject> groupOfCubesAtTimestamps;

    private void Start()
    {
        _audioLoaded = GLOBAL.G.AllAudioImported;
        // int timestep = 5;
        // for (int i = 10; i < _audioImporter.CountTimestamps; i = i + timestep)
        // {
        //     groupOfCubesAtTimestamps = _audioImporter.GetCubesByTimestamp(i);
        // }
    }


    //  private void Update()
    //     {
    //         if (_audioLoaded == true && _cubesPlaced == false)
    //         {
    //             _cubes = _audioImporter._allCubes;

    //             // Assign coordinates from sound file attributes (original prism)
    //             float prismDownScaler = 0.035f;
    //             for (int k = 0; k < _cubes.Count; k++)
    //             {
    //                 GameObject cube = _cubes[k];
    //                 float x = cube.GetComponent<SoundShape>().Timestamp * prismDownScaler;
    //                 float y = cube.GetComponent<SoundShape>().Track * prismDownScaler;
    //                 float z = cube.GetComponent<SoundShape>().Layer * prismDownScaler;
    //                 cube.transform.localScale *= prismDownScaler;
    //                 cube.transform.position = new Vector3(x, y, z);
    //             }
    //             //doghnout transform
    //             int timestep = 5;
    //             for (int i = 10; i < _audioImporter.CountTimestamps; i = i + timestep)
    //             {
    //                 groupOfCubesAtTimestamps = _audioImporter.GetCubesByTimestamp(i);
    //             }
    //             //how to go on?

    //         }
    //         _cubesPlaced = true; // Assuming you only want to do this once
    //     }

    // ! stretched out but works
    private void Update()
    {
        if (_audioLoaded == true && _cubesPlaced == false)
        {
            _cubes = _audioImporter._allCubes;

            // Assign coordinates from sound file attributes (original prism)
            float prismDownScaler = 0.035f;
            for (int k = 0; k < _cubes.Count; k++)
            {
                GameObject cube = _cubes[k];
                float x = cube.GetComponent<SoundShape>().Timestamp * prismDownScaler;
                float y = cube.GetComponent<SoundShape>().Track * prismDownScaler;
                float z = cube.GetComponent<SoundShape>().Layer * prismDownScaler;
                cube.transform.localScale *= prismDownScaler;
                cube.transform.position = new Vector3(x, y, z);

                // Doughnut transformation 
                float innerDiameter = 3f;  // Set your desired inner diameter
                float thickness = 1f;      // Control how thick the doughnut is

                //TODO I need to add a for loop here for the Timestamp Dictionary from AudioImporter. Then per group calculate one angle and apply to x
                float angle = (k / (float)_cubes.Count) * 360.0f; // Angle based on index
                float radius = innerDiameter * 0.5f + z * thickness;

                float newZ = radius * Mathf.Sin(angle * Mathf.Deg2Rad);
                float newX = radius * Mathf.Cos(angle * Mathf.Deg2Rad);

                cube.transform.position = new Vector3(newX, y + 0.7f, newZ);

                // Doughnut transformation 
                // float innerDiameter = 3f;  // Set your desired inner diameter
                // float thickness = 1f;      // Control how thick the doughnut is

                // float angle = (x / prismDownScaler) * (360.0f / _cubes.Count * 2); // Angle based on original X
                // float radius = innerDiameter * 0.5f + z * thickness;

                // float newX = radius * Mathf.Cos(angle * Mathf.Deg2Rad);
                // float newZ = radius * Mathf.Sin(angle * Mathf.Deg2Rad);

                // cube.transform.position = new Vector3(newX, y + 1, newZ);

            }

            _cubesPlaced = true; // Assuming you only want to do this once
        }
    }



    // private void Update()
    // {
    //     if (_audioLoaded == true && _cubesPlaced == false)
    //     {
    //         _cubes = _audioImporter._allCubes;

    //         // Assign coordinates from sound file attributes (original prism)
    //         float prismDownScaler = 0.035f;
    //         for (int k = 0; k < _cubes.Count; k++)
    //         {
    //             GameObject cube = _cubes[k];
    //             float x = cube.GetComponent<SoundShape>().Timestamp * prismDownScaler;
    //             float y = cube.GetComponent<SoundShape>().Track * prismDownScaler;
    //             float z = cube.GetComponent<SoundShape>().Layer * prismDownScaler;
    //             cube.transform.localScale *= prismDownScaler;
    //             cube.transform.position = new Vector3(x, y, z);
    //         }

    //         // Doughnut Transformation & Alignment
    //         float innerDiameter = 1.5f;
    //         float thickness = 1.25f;

    //         for (int k = 0; k < _cubes.Count; k++)
    //         {
    //             GameObject cube = _cubes[k];

    //             float angle = (cube.transform.position.x / prismDownScaler) * (360.0f / _cubes.Count * 2);
    //             float radius = innerDiameter * 0.5f + cube.transform.position.z * thickness;

    //             float newX = radius * Mathf.Cos(angle * Mathf.Deg2Rad);
    //             float newZ = radius * Mathf.Sin(angle * Mathf.Deg2Rad);

    //             Vector3 doughnutPosition = new Vector3(newX, cube.transform.position.y + 1, newZ);
    //             cube.transform.position = doughnutPosition;

    //             Vector3 directionToCenter = Vector3.zero - doughnutPosition;
    //             cube.transform.rotation = Quaternion.LookRotation(directionToCenter);
    //         }

    //         _cubesPlaced = true;
    //     }
    // }


    // private void Update()
    // {
    //     if (_audioLoaded == true && _cubesPlaced == false)
    //     {
    //         //cubes don't have a position yet! they all are at 0,0,0 
    //         _cubes = _audioImporter._allCubes;
    //         //Assign coordinates from sound file attributes
    //         for (int k = 0; k < _cubes.Count; k++)
    //         {
    //             GameObject cube = _cubes[k];
    //             float downScaler = 0.035f;
    //             float x = cube.GetComponent<SoundShape>().Timestamp * downScaler; //time
    //             float y = cube.GetComponent<SoundShape>().Track * downScaler; //audio track in ableton
    //             float z = cube.GetComponent<SoundShape>().Layer * downScaler; //layer can be various pitch frequencies or percussion instruments of one track
    //             cube.transform.localScale *= 0.035f;
    //             cube.transform.position = new Vector3(x, y, z);
    //             // _positionsPrismMadeOfCubes.Add(new Vector3(x, y, z));
    //             // float scaler = 1f;
    //             // cube.transform.position = new Vector3((x * scaler) - 2, y * scaler * 3, z * scaler * 6);
    //             // cube.transform.position = new Vector3((x * scaler) - 2, (y * scaler) + 1, z * scaler);
    //             // cube.transform.position = new Vector3(x, y, z);

    //             // Doughnut transformation 
    //             float innerDiameter = 2.0f;  // Set your desired inner diameter
    //             float thickness = 1.0f;      // Control how thick the doughnut is

    //             float angle = (x / prismDownScaler) * (360.0f / _cubes.Count); // Angle based on original X
    //             float radius = innerDiameter * 0.5f + z * thickness;

    //             float newX = radius * Mathf.Cos(angle * Mathf.Deg2Rad);
    //             float newZ = radius * Mathf.Sin(angle * Mathf.Deg2Rad);

    //             cube.transform.position = new Vector3(newX, y, newZ);

    //         }

    //         //more cube placing here

    //         // if (_positionsPrismMadeOfCubes == null || _positionsPrismMadeOfCubes.Count == 0)
    //         // {
    //         //     Debug.LogError("No positionsPrismMadeOfCubes provided.");
    //         //     return;
    //         // }
    //         // float doughnutDiameter = 1.5f;
    //         // float angleStep = 360f / _cubes.Count;
    //         // float currentAngle = 0;

    //         // float innerDiameter = 1.5f;

    //         // float radius = innerDiameter / 2.0f; // Convert diameter to radius

    //         //! kind of worked
    //         // for (int i = 0; i < _cubes.Count; i++)
    //         // {
    //         //     Vector3 originalPosition = _cubes[i].transform.position;

    //         //     // Convert original X and Z positions to polar coordinates
    //         //     float angle = originalPosition.x / radius; // Assuming X values are within the range of 0 to 2*PI
    //         //     float distance = originalPosition.z + radius; // Adding radius to ensure the cubes are placed outside the inner circle

    //         //     // Convert back to Cartesian coordinates
    //         //     float newX = distance * Mathf.Cos(angle);
    //         //     float newZ = distance * Mathf.Sin(angle);

    //         //     // Update the cube's position in the list
    //         //     _cubes[i].transform.position = new Vector3(newX, originalPosition.y, newZ);
    //         // }
    //         // Debug.Log("_audioImporter.CountTimestamps " + _audioImporter.CountTimestamps);

    //         // float innerDiameter = 10f; // Adjustable inner diameter
    //         // float cubeCount = _cubes.Count;

    //         // for (int i = 0; i < cubeCount; i++)
    //         // {
    //         //     Transform cubeTransform = _cubes[i].transform;
    //         //     Vector3 originalPos = cubeTransform.localPosition; // Get local position

    //         //     float angle = (i / cubeCount) * 2f * Mathf.PI;
    //         //     float newX = (innerDiameter / 2f + originalPos.z) * Mathf.Cos(angle);
    //         //     float newZ = (innerDiameter / 2f + originalPos.z) * Mathf.Sin(angle);

    //         //     // Update the transform
    //         //     cubeTransform.localPosition = new Vector3(newX, originalPos.y, newZ);
    //         // }


    //         // for (int i = 0; i < _cubes.Count; i++)
    //         // {
    //         //     float radius = doughnutDiameter + _cubes[i].transform.position.z;
    //         //     float posX = radius * Mathf.Cos(currentAngle * Mathf.Deg2Rad);
    //         //     float posY = _cubes[i].transform.position.y;
    //         //     float posZ = radius * Mathf.Sin(currentAngle * Mathf.Deg2Rad);

    //         //     _cubes[i].transform.position = new Vector3(posX, posY, posZ);

    //         //     currentAngle += angleStep;
    //         // }

    //     }
    //     _cubesPlaced = true;
    //     //done with cube placing
    // }


    // private void Update()
    // {
    //     if (_audioLoaded == true && _cubesPlaced == false)
    //     {
    //         _cubes = _audioImporter._allCubes;
    //         //Assign coordinates from sound file attributes
    //         for (int k = 0; k < _cubes.Count; k++)
    //         {
    //             GameObject cube = _cubes[k];
    //             float downScaler = 0.035f;
    //             float x = cube.GetComponent<SoundShape>().Timestamp * downScaler; //time
    //             float y = cube.GetComponent<SoundShape>().Track * downScaler; //audio track in ableton
    //             float z = cube.GetComponent<SoundShape>().Layer * downScaler; //layer can be various pitch frequencies or percussion instruments of one track
    //             cube.transform.localScale *= 0.035f;
    //             _positionsPrismMadeOfCubes.Add(new Vector3(x, y, z));

    //             float scaler = 1f;
    //             // cube.transform.position = new Vector3((x * scaler) - 2, y * scaler * 3, z * scaler * 6);
    //             cube.transform.position = new Vector3((x * scaler) - 2, (y * scaler) + 1, z * scaler);

    //         }

    //         //more cube placing here

    //         // if (_positionsPrismMadeOfCubes == null || _positionsPrismMadeOfCubes.Count == 0)
    //         // {
    //         //     Debug.LogError("No positionsPrismMadeOfCubes provided.");
    //         //     return;
    //         // }

    //         // float doughnutDiameter = 5f;
    //         // float doughnutHeight = 2f;

    //         // //define measures of doughnut shape
    //         // float angleStep = 360f / _positionsPrismMadeOfCubes.Count;
    //         // float currentAngle = 0;

    //         // for (int i = 0; i < _positionsPrismMadeOfCubes.Count; i++)
    //         // {
    //         //     float posX = doughnutDiameter * Mathf.Cos(currentAngle * Mathf.Deg2Rad);
    //         //     float posY = doughnutHeight * Mathf.Sin(currentAngle * Mathf.Deg2Rad);
    //         //     float posZ = _cubes[i].transform.position.z;

    //         //     _cubes[i].transform.position = new Vector3(posX, posY, posZ); // BUG all cubes different count than positionsprisms 

    //         //     currentAngle += angleStep;
    //         // }

    //     }
    //     _cubesPlaced = true;
    //     //done with cube placing
    // }

}