public class Problem12 {
    public static void main(String[] args) {
        int[] numbers = new int[]{23, 8, 16, 4, 42, 15};

        int n = numbers.length;
        int[] minimums = new int[n / 2];
        int[] maximums = new int[n / 2];


        // comparing two pair at a time and put them in corresponding array
        for (int i = 0; i < n; i += 2) {
            if (numbers[i] < numbers[i + 1]) {
                minimums[i / 2] = numbers[i];
                maximums[i / 2] = numbers[i + 1];
            } else {
                minimums[i / 2] = numbers[i + 1];
                maximums[i / 2] = numbers[i];
            }
        }


        // calculating min
        int min = minimums[0];
        for (int i = 1; i < n / 2; i++) {
            if (min > minimums[i])
                min = minimums[i];
        }

        System.out.println("min: " + min);


        // calculating max
        int max = maximums[0];
        for (int i = 1; i < n / 2; i++) {
            if (max < maximums[i])
                max = maximums[i];
        }

        System.out.println("max: " + max);
    }
}
