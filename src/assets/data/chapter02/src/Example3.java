public class Example3 {
    public static void main(String[] args) {
        int n = Integer.MAX_VALUE;

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.println(i * j);
            }
        }
    }
}
