using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Cryptography;
using UnityEngine;
using UnityEngine.UIElements;
using Slider = UnityEngine.UI.Slider;

public class UI : MonoBehaviour {
    public Cubes cubes;
    

    private void OnEnable() {
        VisualElement root = GetComponent<UIDocument>().rootVisualElement;
        MinMaxSlider xSlider = root.Q<MinMaxSlider>("x_slider");
        xSlider.lowLimit = 1; // Set the minimum value of the range
        xSlider.highLimit = Cubes.MaxCubeRow; // Set the maximum value of the range
        xSlider.value = new Vector2(1, 2); // Set the initial selected subrange
        //Register a callback for when the slider's value changes
        xSlider.RegisterValueChangedCallback(evt => {
            Vector2 sliderValueX = evt.newValue;
            // Call method here, and pass the slider values 
            cubes.Select_X_Row(sliderValueX);
        });
        
        MinMaxSlider ySlider = root.Q<MinMaxSlider>("y_slider");
        ySlider.lowLimit = 1; // Set the minimum value of the range
        ySlider.highLimit = Cubes.MaxCubeRow; // Set the maximum value of the range
        ySlider.value = new Vector2(1, 2); // Set the initial selected subrange
        //Register a callback for when the slider's value changes
        ySlider.RegisterValueChangedCallback(evt => {
            Vector2 sliderValueY = evt.newValue;
            // Call method here, and pass the slider values 
            cubes.Select_Y_Row(sliderValueY);
        });
        
        MinMaxSlider zSlider = root.Q<MinMaxSlider>("z_slider");
        zSlider.lowLimit = 1; // Set the minimum value of the range
        zSlider.highLimit = Cubes.MaxCubeRow; // Set the maximum value of the range
        zSlider.value = new Vector2(1, 2); // Set the initial selected subrange
        //Register a callback for when the slider's value changes
        zSlider.RegisterValueChangedCallback(evt => {
            Vector2 sliderValueZ = evt.newValue;
            // Call method here, and pass the slider values 
            cubes.Select_Z_Row(sliderValueZ);
            
        });

        //1 = color
        //2 = size smaller
        //3 = spin right x
        //4 = color 2
        //5 = spin left z
        //6 = color 3
        //7 = different shape sphere
        //7 = different shape triangle
        //8 = force up
        //9 = gravity on
        
        //Buttons
        Button button1 = root.Q<Button>("Button1");
        button1.clicked += cubes.Button1;
        
        Button button2 = root.Q<Button>("Button2");
        button2.clicked += cubes.Button2;

        Button button3 = root.Q<Button>("Button3");
        button3.clicked += cubes.Button3;
        
        Button button4 = root.Q<Button>("Button4");
        button4.clicked += cubes.Button4;
        
        Button button5 = root.Q<Button>("Button5");
        button5.clicked += cubes.Button5;

        Button button6 = root.Q<Button>("Button6");
        button6.clicked += cubes.Button6;
        
        Button button7 = root.Q<Button>("Button7");
        button7.clicked += cubes.Button7;
        
        Button button8 = root.Q<Button>("Button8");
        button8.clicked += cubes.Button8;

        Button button9 = root.Q<Button>("Button9");
        button9.clicked += cubes.Button9;
    }
    
   

    // Start is called before the first frame update
    void Start() {
    }

    // Update is called once per frame
    void Update() {
        
        
    }
}