public class Example18 {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;

        for (int i = 1; i <= n; i++) {
            if (i % 3 <= 0)
                for (int j = 1; j <= n; j++) {
                    System.out.println("Hello, friend!");
                }
            if (i % 3 <= 1)
                for (int j = 1; j <= n; j++) {
                    System.out.println("Hello, friend!");
                }
            if (i % 3 <= 2)
                for (int j = 1; j <= n; j++) {
                    System.out.println("Hello, friend!");
                }
        }
    }
}
