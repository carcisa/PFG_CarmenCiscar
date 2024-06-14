# Stage 1: Build the Angular application
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json separately
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Stage 2: Run the SSR application
FROM node:18-alpine

WORKDIR /app

# Copy the built Angular application from the build stage
COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the SSR application is running on
EXPOSE 4000

# Start the Angular Universal server
CMD ["npm", "run", "serve:ssr:src-angular"]
