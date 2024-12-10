# When-and-Where-to-Meet Frontend
[DEMO Link](https://db-finalproject.jikuai.dev)

This repository contains the frontend for the "When-and-Where-to-Meet" application.

## Prerequisites

Ensure you have the following installed and configured on your system:

- **Node.js**: Required for running the frontend.
    - Particularly, `node` version `23.1.0` and `npm` version `10.9.0` are preferred.

## Environment Setup

1. **Install Necessary Packages**
   
   Run the following command to install the required dependencies:
   ```bash
   npm ci
   ```

2. **Set Up Environment Variables**

   Copy the `.env.example` file as `.env` in the root directory adn configure the following environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3030 # No trailing slash
   ```
   The above link is the URL of the backend.

3. **(Local test)**

   Run the following command to run in development mode:
   ```bash
   npm run dev
   ```

4. **Run the Frontend**

   On production, run the following codes instead:
   ```bash
   npm run build
   npm run start
   ```

## Additional Notes

- Ensure your backend service is running before attempting to build or run the application.

For further details, refer to the project documentation or contact the repository maintainers.
