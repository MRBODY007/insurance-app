const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx", //  ชี้ไปที่ไฟล์ entry ของ React
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, "public"),
    historyApiFallback: true,
    hot: true,
    port: 3000, //  ใช้พอร์ตเดียวกับ React Dev Server
  },
};
