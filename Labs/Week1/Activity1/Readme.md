# Instalation and ejecution of script node.js
In this first activity our objective is to install node.Js from the official node page and we will also execute a script to print a "Hello world" message through the console 

### Installing Node.js

1. **Download Node.js:**
   - Visit the official [Node.js website](https://nodejs.org/).
   - Download the recommended version for your operating system (e.g., Windows, macOS, Linux).

2. **Install Node.js:**
   - Follow the installation instructions provided on the Node.js website.
   - Ensure you understand each command used during the installation process.

3. **Verify Installation:**
   - Open a terminal or command prompt.
   - To check if Node.js is installed, run:
     ```
     node -v
     ```
   - To verify if npm (Node Package Manager) is installed, run:
     ```
     npm -v
     ```

4. **Optional: Install Using a Version Manager (e.g., `nvm`):**
   - If you prefer managing multiple Node.js versions, install `nvm` (Node Version Manager) from its [GitHub repository](https://github.com/nvm-sh/nvm).
   - Use `nvm` to install and manage different versions of Node.js:
     ```
     nvm install <version>
     ```
     ```
     nvm use <version>
     ```

### Summary

By following these steps, you will have successfully installed Node.js on your system. Verify the installation by checking Node.js and npm versions in your terminal. Using a version manager like `nvm` provides flexibility in managing Node.js versions for different projects.

### Creating a "Hello World" Script in the `src` Folder

1. **Create Folder Structure:**
   - Open your terminal or command line.
   - Navigate to the directory where you want to create your project. For example:
     ```bash
     cd Weed1/
     mkdir src
     cd src
     ```

2. **Create a JavaScript File:**
   - In the terminal, within the `src` folder, create a JavaScript file named `hello.js`. You can do this using the `touch` command on Unix/Linux systems or by simply creating it with your text editor:
     ```bash
     touch hello.js
     ```
   - Alternatively, you can create it manually or with your preferred code editor.

3. **Edit the `hello.js` File:**
   - Open the `hello.js` file in your code editor (e.g., Visual Studio Code):
     ```javascript
     // hello.js
     console.log("Hello World");
     ```

4. **Save and Close the File:**
   - Save the changes made to `helloWorld.js` and close the code editor.

5. **Run the Script from the Console:**
   - From the terminal, ensure you are in the `src` folder where your `HelloWorld.js` file is located.
   - Execute the following command to run the script and see the "Hello World" message in the console:
     ```bash
     node src/HelloWorld.js
     ```
   - You should see `Hello World` printed in the console.

### Summary

By following these steps, you have created a basic project with a simple JavaScript script that prints "Hello World" to the console. This provides you with an initial introduction to developing applications using JavaScript and Node.js.