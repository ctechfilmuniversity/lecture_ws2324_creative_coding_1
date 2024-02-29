using UnityEngine;
using UnityEngine.XR.ARFoundation;
namespace com.artbymarek.dirmic
{
    /// <summary>
    ///Temporary Helper to Automatically place the 3D  model on the ground of the camera.
    /// </summary>
    public class PlaceModelAutomatically : MonoBehaviour
    {
        public GameObject modelPrefab;
        private Vector3 modelPositionRelativeToCamera = new Vector3(0, 0, 1);
        private GameObject spawnedModel;

        void Start()
        {
            Camera mainCamera = Camera.main;
            Vector3 modelPosition = mainCamera.transform.position + mainCamera.transform.TransformDirection(modelPositionRelativeToCamera);
            spawnedModel = Instantiate(modelPrefab, modelPosition, Quaternion.identity);

        }
    }
}