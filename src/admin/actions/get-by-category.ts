import prismadb from "@/lib/prismadb";

const getTwoProductsPerCategory = async () => {
  try {
    const productsByCategories = await prismadb.category.findMany({
      include: {
        products: {
          take: 2, // Limit the result to 2 products per category
          orderBy: {
            createdAt: "desc", // Order products by creation date in descending order
          },
        },
      },
    });

    return productsByCategories;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Example of how to use the function
// Assuming you have a Prisma client instance named "prisma"
const result = await getTwoProductsPerCategory(prisma);
console.log(result);
