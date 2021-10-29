public class Example14 {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n + i; j++) {
                for (int k = i + j; k <= n; k++) {
                    System.out.println("Hello, friend!");
                    System.out.println("Hello, friend!");
                }
            }
        }
    }
}
