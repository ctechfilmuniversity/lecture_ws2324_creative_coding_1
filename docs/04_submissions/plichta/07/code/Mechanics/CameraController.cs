using UnityEngine;
using System.Collections;
public class CameraController : MonoBehaviour
{
    public float mouseSensitivity = 100f;
    public float moveSpeed = 5f;
    public float jumpForce = 8f;
    public float gravity = -9.81f;
    public float elevationSpeed = 5f;
    public float maxElevationAngle = 80f;

    private float xRotation = 0f;
    private Vector3 velocity;
    private bool isGrounded;
    private bool isJumping = false;
    private bool isCrouching = false;
    private bool isSprinting = false;
    private bool isElevating = false;
    private bool isLocked = false;

    void Start()
    {
        Cursor.lockState = CursorLockMode.Locked;
        Cursor.visible = false;
    }

    void Update()
    {
        // Mouse look
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;

        xRotation -= mouseY;
        xRotation = Mathf.Clamp(xRotation, -maxElevationAngle, maxElevationAngle);

        transform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
        transform.parent.Rotate(Vector3.up * mouseX);

        // Movement
        Vector3 move = new Vector3(Input.GetAxis("Horizontal"), 0f, Input.GetAxis("Vertical"));
        move = transform.rotation * move;
        move.y = gravity;

        // Apply movement
        if (isGrounded)
        {
            velocity = move;
        }
        else
        {
            velocity += move;
        }

        // Jumping
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            velocity.y = Mathf.Sqrt(jumpForce * -2f * gravity);
            isJumping = true;
        }

        // Elevation
        if (Input.GetKey(KeyCode.Q))
        {
            isElevating = true;
            xRotation -= elevationSpeed * Time.deltaTime;
            xRotation = Mathf.Clamp(xRotation, -maxElevationAngle, maxElevationAngle);
        }
        else if (Input.GetKey(KeyCode.E))
        {
            isElevating = true;
            xRotation += elevationSpeed * Time.deltaTime;
            xRotation = Mathf.Clamp(xRotation, -maxElevationAngle, maxElevationAngle);
        }
        else
        {
            isElevating = false;
        }

        // Apply gravity
        if (!isGrounded)
        {
            velocity.y += gravity * Time.deltaTime;
        }

        // Move the player
        transform.position += velocity * Time.deltaTime;

        // Lock cursor
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            isLocked = !isLocked;
            Cursor.lockState = isLocked ? CursorLockMode.Locked : CursorLockMode.None;
            Cursor.visible = !isLocked;
        }
    }
}
