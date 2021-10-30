public class Problem1Section3 {
    public static void main(String[] args) {
        int[] numbers = new int[]{4, 8, 15, 16, 23, 42};
        int target = 23;

        int n = numbers.length;

        for (int i = 0; i < n; i++) {
            if (numbers[i] == target) {
                System.out.println("index: " + i);
                break;
            }
        }
    }
}
