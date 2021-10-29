public class Example9 {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if ((i * j) % 2 == 1)
                    System.out.println("Hello, friend!");
                if ((i * j) % 2 == 0)
                    System.out.println("Hello, friend!");
            }
        }
    }
}
