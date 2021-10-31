public class Problem13 {
    public static void main(String[] args) {
        int[] a = new int[]{4, 8, 15, 16, 23, 42};
        int[] b = new int[]{815, 324, 108};
        int target = 340;

        int n = a.length;
        int m = b.length;


        int i = 0;
        int j = 0;
        int sum;

        do {
            sum = a[i] + b[j];

            if (sum < target) {
                i++;
            } else if (sum > target) {
                j++;
            } else {
                System.out.println("a[" + i + "] + b[" + j + "] = " + target);
                System.out.println(a[i] + " + " + b[j] + " = " + target);
                return;
            }

        } while (i < n && j < m);

        System.out.println("not found!");
    }
}
