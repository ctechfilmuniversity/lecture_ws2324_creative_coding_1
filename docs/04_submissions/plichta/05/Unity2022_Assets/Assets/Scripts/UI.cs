using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Moments.com.artbymarek.experiments.circles {
    public class UI : MonoBehaviour {
        private string debugText = "ARROW KEY UP/DOWN TO ZOOM. MOUSE TO LOOK AROUND";

        void OnGUI() {
            Rect rect2 = new Rect(40, 30, 400, 60);
            // Set style (optional)
            GUIStyle style2 = new GUIStyle();
            style2.fontSize = 24;
            style2.normal.textColor = Color.black;
            // Draw the label
            GUI.Label(rect2, debugText, style2);
            
            // Set position and size
            Rect rect = new Rect(40, 29, 400, 60);

            // Set style (optional)
            GUIStyle style = new GUIStyle();
            style.fontSize = 24;
            style.normal.textColor = Color.gray;
            // Draw the label
            GUI.Label(rect, debugText, style);
            
            
            
        }

        // Update is called once per frame
        void Update() {
            // Update the debugText with whatever information you want to display
            //debugText = "Updated text: " + Time.time;
        }
    }
}