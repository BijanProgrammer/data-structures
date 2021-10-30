public class Problem1Section1 {
    public static void main(String[] args) {
        int[] firstArray = new int[]{1, 2, 3};
        int[] secondArray = new int[]{4, 5, 6};

        int n = firstArray.length;
        int[] result = new int[n];

        for (int i = 0; i < n; i++)
            result[i] = firstArray[i] + secondArray[i];

        // print array ...
    }
}
