using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using UnityEngine.InputSystem;
using UnityEngine.Serialization;
using JetBrains.Annotations;

namespace com.artbymarek.dirmic
{
    /// <summary>
    /// A marker is projected on an AR plane which is used to place the 3D model
    /// </summary>
    [RequireComponent(typeof(ARRaycastManager))]
    public class PlaceOnIndicator : MonoBehaviour
    {
        [TextArea] public string Notes;
        [SerializeField] GameObject placementIndicator;

        [FormerlySerializedAs("placedPrefab")][SerializeField] GameObject placedModel;
        [SerializeField] InputAction touchInput;

        GameObject spawnedObject;
        ARRaycastManager aRRaycastManager;
        List<ARRaycastHit> hits = new List<ARRaycastHit>();

        private bool _alreadyPlacedOnce;

        private void Awake()
        {
            aRRaycastManager = GetComponent<ARRaycastManager>();

            //we have an event attached to when some taps/clicks and execute PlaceObject if it happens
            // the _ here means we don't care about return values (or so). Was a bit too hard to get that for me atm
            touchInput.performed += _ => { PlaceObject(); };


            placementIndicator.SetActive(false);
        }

        private void OnEnable()
        {
            touchInput.Enable();
        }

        private void OnDisable()
        {
            touchInput.Disable();
        }

        private void Update()
        {
            //XXX add a way to set height of the model
            if (!_alreadyPlacedOnce)
            {
                //if (aRRaycastManager.Raycast(new Vector2(Screen.width / 2, Screen.height / 2), hits, TrackableType.PlaneWithinPolygon))
                if (aRRaycastManager.Raycast(
                    new Vector2(Screen.width / 2, Screen.height / 2),
                    hits,
                    TrackableType.PlaneWithinPolygon))
                {
                    var hitPose = hits[0].pose;
                    placementIndicator.transform.SetPositionAndRotation(hitPose.position, hitPose.rotation);

                    if (!placementIndicator.activeInHierarchy)
                        placementIndicator.SetActive(true);
                }
                else
                {
                    placementIndicator.SetActive(false);
                }
            }
        }

        public void PlaceObject()
        {
            if (!placementIndicator.activeInHierarchy)
                return;

            if (!_alreadyPlacedOnce)
            {
                Instantiate
                (
                placedModel,
                placementIndicator.transform.position,
                placementIndicator.transform.rotation
                );

                placedModel.SetActive(true);
                _alreadyPlacedOnce = true;
            }
        }
    }
}