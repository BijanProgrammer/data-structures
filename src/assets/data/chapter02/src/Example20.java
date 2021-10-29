public class Example20 {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;

        for (int i = 2; i <= n; i = i * i) {
            for (int j = 1; j <= i; j *= 2) {
                System.out.println("Hello, friend!");
            }
        }
    }
}
