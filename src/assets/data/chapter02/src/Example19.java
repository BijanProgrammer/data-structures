public class Example19 {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i % 7 == 4)
                    break;

                for (int k = 1; k <= n; k++) {
                    System.out.println("Hello, friend!");
                }
            }
        }
    }
}
