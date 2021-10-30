public class Problem1Section2 {
    public static void main(String[] args) {
        int[] numbers = new int[]{23, 8, 16, 4, 42, 15};

        int n = numbers.length;
        int maximum = numbers[0];

        for (int i = 1; i < n; i++) {
            if (maximum < numbers[i])
                maximum = numbers[i];
        }

        System.out.println("maximum: " + maximum);
    }
}
