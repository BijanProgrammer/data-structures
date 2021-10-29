public class Example12 {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;

        for (int i = 1; i <= n; i++) {
            System.out.println("Hello, friend!");

            if (i % 5 != 0) {
                for (int j = 1; j <= n; j++) {
                    System.out.println("Hello, friend!");
                }
            }
        }
    }
}
