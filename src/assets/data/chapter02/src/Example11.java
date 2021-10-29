public class Example11 {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;

        for (int i = 1; i <= n; i++) {
            System.out.println("Hello, friend!");

            for (int j = i; j <= n; j++) {
                System.out.println("Hello, friend!");

                for (int k = j; k <= n; k++) {
                    System.out.println("Hello, friend!");
                }
            }
        }
    }
}
