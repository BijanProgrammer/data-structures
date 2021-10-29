public class Example13 {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;

        for (int i = 1; i <= n; i++) {
            System.out.println("Hello, friend!");

            if (i % 5 != 0) {
                System.out.println("Hello, friend!");

                for (int j = 1; j <= n; j++) {
                    System.out.println("Hello, friend!");
                }
            }
        }
    }
}
