import java.util.Scanner;
class Lights {
    void on() {
        System.out.println("Lights are ON");
    }

    void off() {
        System.out.println("Lights are OFF");
    }
}

class Blinds {
    void up() {
        System.out.println("Blinds are UP");
    }

    void down() {
        System.out.println("Blinds are DOWN");
    }
}

class AirConditioner {
    void on() {
        System.out.println("Air conditioner is ON");
    }

    void off() {
        System.out.println("Air conditioner is OFF");
    }
}

class SecuritySystem {
    void activate() {
        System.out.println("Security system ACTIVATED");
    }

    void deactivate() {
        System.out.println("Security system DEACTIVATED");
    }
}


// Clase Fachada 

class SmartHomeFacade {
    private Lights lights;
    private Blinds blinds;
    private AirConditioner airConditioner;
    private SecuritySystem securitySystem;

    public SmartHomeFacade() {
        this.lights = new Lights();
        this.blinds = new Blinds();
        this.airConditioner = new AirConditioner();
        this.securitySystem = new SecuritySystem();
    }

    // Método: activar el modo "Llegada a casa"

    public void homeModeOn() {
        System.out.println("\nActivating Home Mode...");
        lights.on();
        blinds.up();
        airConditioner.on();
        securitySystem.deactivate();
        System.out.println("Home Mode is now ACTIVE \n");
    }

   
    // Método: activar el modo "Salida de casa"
    
    public void homeModeOff() {
        System.out.println("\nActivating Away Mode...");
        lights.off();
        blinds.down();
        airConditioner.off();
        securitySystem.activate();
        System.out.println("Away Mode is now ACTIVE\n");
    }
}

// Clase Cliente (interactiva)

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        SmartHomeFacade smartHome = new SmartHomeFacade();
        boolean running = true;

        // ------------------------------------------------------------
        // Menú interactivo de consola
        // ------------------------------------------------------------
        System.out.println("=== SMART HOME SYSTEM ===");

        while (running) {
            System.out.println("\nSelect an option:");
            System.out.println("1. Activate Home Mode");
            System.out.println("2. Activate Away Mode");
            System.out.println("3. Exit");
            System.out.print("Enter your choice: ");

            int choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    smartHome.homeModeOn();
                    break;
                case 2:
                    smartHome.homeModeOff();
                    break;
                case 3:
                    running = false;
                    System.out.println("\nGoodbye");
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }

        scanner.close();
    }
}

