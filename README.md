# Rayka EyeSP Dashboard

## Introduction

The Rayka EyeSP Dashboard serves as a critical tool for real-time monitoring of internet statistics across domestic internet service providers. This platform is designed for users to assess internet quality, including status, download and upload speeds, ping, and disruptions. It's an essential utility for individuals and organizations that rely on stable and fast internet connectivity, providing actionable insights into the performance and reliability of their internet services.

## Features

The Rayka EyeSP Dashboard is meticulously crafted to offer a wide array of features for comprehensive internet performance monitoring:- Real-time Monitoring: Continuously track live data on internet connectivity status across multiple ISPs.

- Real-time Monitoring Our dashboard continuously tracks live data on internet connectivity status across multiple ISPs.

- Speed Test Metrics: Our dashboard measures and displays key performance indicators such as download and upload speeds.

- Latency Reporting: Our dashboard evaluates and reports on latency issues with detailed ping statistics.

- Disruption Alerts: Our dashboard allows users to receive notifications and view details on internet disruptions or disconnections.

- Interactive Data Visualization: Our dashboard utilizes sophisticated charting libraries to render data intuitively.

- Customizable Dashboards: Our dashboard enables users to personalize their experience with dynamic theming and design.

- Responsive Design: Our dashboard maintains functionality and aesthetics across a variety of devices and screen sizes.

- Advanced Data Fetching: Our dashboard leverages efficient data fetching and state management for a smooth user interface.

- Material UI Integration: Our dashboard implements a polished look with a modern design for an intuitive user interface.

- Client-Server Interaction: Our dashboard manages robust data transfer and API interaction through Axios.

- Navigation and Routing: Our dashboard facilitates fluid navigation throughout the application with React Router.

- Comprehensive Visibility: Our dashboard provides detailed insights into the availability of internal and internet services.

- Geographical Representation: Our dashboard utilizes a map to display the status of services in different provinces, allowing users to pinpoint areas with disruptions.

- Detailed Information: Our dashboard enables users to access comprehensive details about service availability, distinguishing between areas facing issues and those with uninterrupted services.

### Our Service Availability Map

- Comprehensive Visibility: Our dashboard provides detailed insights into the availability of internal and internet services.
- Geographical Representation: Utilizing a map, our dashboard displays the status of services in different provinces, allowing users to pinpoint areas with disruptions.
- Detailed Information: Users can access comprehensive details about service availability, distinguishing between areas facing issues and those with uninterrupted services.

## Technologies Used

We employ a suite of modern technologies to ensure that our dashboard is at the cutting edge of functionality and performance:

### React

- Description: A declarative, efficient, and flexible JavaScript library for building user interfaces.
- Role in Project:
  Component-Based Architecture: React's component-based structure allows for the modular development of your dashboard. Each component can be developed, tested, and maintained independently, leading to a more organized and scalable codebase. This approach is particularly effective for complex user interfaces like dashboards.

Efficient State Management: React's state management capabilities are crucial for a dashboard that displays real-time data. React efficiently updates the UI in response to state changes, ensuring that your dashboard reflects the most current data without unnecessary renderings.

Responsive and Dynamic UI: React is well-suited for creating responsive user interfaces that adapt to different screen sizes and devices. This ensures that your dashboard offers an optimal user experience across all platforms.

Real-time Data Rendering: React's virtual DOM makes it an excellent choice for applications that require frequent UI updates, like a dashboard displaying real-time performance metrics. It minimizes direct DOM manipulation, leading to improved performance and a smoother user experience.

Ecosystem and Community Support: React's widespread adoption comes with a robust ecosystem, including libraries and tools that are particularly useful for developing dashboards (like charting libraries). Additionally, a strong community provides support, resources, and best practices.

Seamless Integration with Other Technologies: React can be easily integrated with various back-end technologies and APIs, facilitating the real-time data flow required for your dashboard.

JSX for Clearer Code: The use of JSX in React allows for writing HTML in JavaScript, resulting in clearer and more readable code, which is especially beneficial in complex UIs like dashboards.

### TypeScript

- Description: An open-source language which builds on JavaScript by adding static type definitions.
- Role in Project:
  Type Safety: TypeScript's primary advantage is its ability to enforce type safety. This means it can catch errors at compile time that would otherwise only be discovered at runtime in plain JavaScript. By ensuring variables and functions are used with the correct types, TypeScript significantly reduces the likelihood of type-related bugs.

Improved Code Quality and Maintainability: With TypeScript, your code becomes more predictable and easier to understand. This is particularly beneficial in large projects or when working in a team, as it makes the codebase more approachable and maintainable. Developers can quickly understand what a piece of code is supposed to do, and what types of values it should work with.

Enhanced Development Experience: TypeScript's integration with modern development tools provides an enhanced coding experience. Features like auto-completion, code navigation, and refactoring tools are more powerful and accurate with TypeScript due to its understanding of types.

Future-Proofing: TypeScript aligns closely with the latest ECMAScript standards and allows you to use next-gen JavaScript features while maintaining backward compatibility. This makes your React project more future-proof.

Easier Collaboration: When working in a team, TypeScript's explicit type annotations can serve as a form of documentation, making it easier for new team members to understand the code and for the entire team to collaborate effectively.

### Vite

- Description: A modern, fast front-end build tool that leverages rollup and esbuild.
- Role in Project:
  Exceptionally Fast Hot Module Replacement (HMR): Vite's HMR feature stands out for its speed, which is crucial for a smoother and more efficient development experience. With HMR, changes made in the code are instantly reflected in the browser without a full page reload. This immediate feedback loop accelerates the development process, allowing developers to see their changes in real-time and quickly iterate on their work.

Efficient Build Process: Vite optimizes the build process using modern JavaScript techniques. It leverages Rollup under the hood for production builds, which results in optimized bundle sizes and faster loading times. This efficiency is particularly beneficial for large-scale projects where build performance can significantly impact development speed.

Faster Development Lifecycle: By combining fast HMR with an efficient build process, Vite significantly speeds up the overall development lifecycle. This rapid development cycle allows for quicker prototyping, testing, and delivery of features, enhancing productivity and reducing time-to-market.

Modern Tooling and Ecosystem: Vite is designed to work seamlessly with modern JavaScript frameworks and supports various plugins and integrations. This flexibility ensures that it can easily adapt to the evolving needs of a project, from development to production.

Simplified Project Setup and Configuration: Vite offers a more straightforward and less configuration-intensive setup compared to traditional build tools. This simplicity reduces the initial overhead for new projects and makes it easier for new team members to onboard.

Enhanced Developer Experience: Vite improves the overall developer experience by reducing the complexity and time involved in the development process. Its focus on speed and efficiency, combined with modern tooling, makes it a developer-friendly choice.

## Key Dependencies

### @emotion/react and @emotion/styled

- Description: Libraries designed to write CSS styles with JavaScript, promoting dynamic styling in React components.
- Role in Project:
  Dynamic Styling in React Components: These libraries empower you to write CSS styles within your JavaScript code, offering a more dynamic approach to styling. This is particularly useful in React, where your UI logic and style can be closely intertwined.

Powerful and Flexible Styling Capabilities: Emotion provides a rich set of features for writing CSS styles. Its API is both powerful and flexible, enabling developers to create complex styles that are difficult to achieve with traditional CSS.

Rapid Theming and Design Application: With Emotion, applying themes and designs to your dashboard components becomes a streamlined process. You can easily modify styles based on props, state, or global themes, allowing for quick and responsive design changes across your application.

Enhanced Performance with Styled Components: @emotion/styled utilizes styled components, which are optimized for performance. Styled components help in maintaining a clean and organized codebase by encapsulating styles within specific components.

Seamless Integration with React: Emotion is designed to integrate seamlessly with React. This makes it a natural choice for projects utilizing React, as it complements the component-based architecture of React.

Scalability and Maintainability: Emotion's approach to styling is both scalable and maintainable, which is crucial for large-scale projects like your dashboard. It allows for a modular styling approach, where styles are reusable and can be easily managed.

Conditional and Dynamic Styling: The ability to apply styles conditionally or dynamically based on component states or props is a key advantage. This feature is particularly beneficial for creating responsive and interactive UIs in a dashboard.

### @mui/material and @mui/icons-material

- Description: React UI libraries that implement Google's Material Design for building rich user interfaces.
- Role in Project:
  Implementation of Google's Material Design: These libraries are based on Material Design, a design language developed by Google. This ensures that your dashboard will have a modern, sleek, and consistent look and feel that users are familiar with, enhancing usability and aesthetic appeal.

Comprehensive Suite of Pre-Designed Components: @mui/material offers a wide range of pre-designed components such as buttons, cards, dialogs, and more. These components are customizable and can be integrated seamlessly into your dashboard, speeding up the development process by providing ready-to-use solutions.

Consistent and Intuitive User Experience: The use of Material UI components ensures a consistent and intuitive user experience across the dashboard. The design principles of Material Design, such as responsive interactions and visual cues, contribute to an interface that is easy to navigate and understand.

Rich Set of Icons with @mui/icons-material: @mui/icons-material provides a vast library of icons, which are essential for creating a visually engaging and intuitive user interface. These icons can be easily integrated with the components from @mui/material to enhance the functionality and aesthetic of your dashboard.

Customization and Theming: Both libraries offer extensive customization options. This allows you to tailor the appearance of components and icons to match your dashboard’s specific branding and design requirements.

Efficiency in Development: Using these libraries can significantly reduce development time and effort. Instead of building components from scratch, developers can leverage the extensive library of pre-made components and focus on implementing unique features and logic.

Responsive and Accessible Design: Material UI components are designed to be responsive and accessible, ensuring that your dashboard is usable across various devices and accessible to all users, including those with disabilities.

Community and Ecosystem Support: Being part of the Material-UI ecosystem, these libraries are supported by a large community of developers. This means regular updates, a wealth of documentation, and a wide array of community-contributed resources.

### @tanstack/react-query

- Description: A library for fetching, caching, and updating data in React applications with zero-config.
- Role in Project:

Efficient Data Fetching and Caching: React Query excels in fetching, caching, and updating data in React applications. It automatically handles the caching of data, which means that your application will make fewer network requests, reducing the load on your servers and improving the user experience by displaying cached data instantly.

Simplified State Management for Server-State: Traditionally, managing server-state in React applications can be complex and involves a lot of boilerplate code. React Query simplifies this process by providing hooks like useQuery and useMutation to manage server-state without the need for additional state management libraries.

Automatic Data Synchronization: React Query automatically keeps the server-state in sync with your UI. It refetches data in the background when parameters change or at specified intervals, ensuring that the user interface always displays the most current data.

Zero-Configuration Setup: One of the key benefits of React Query is its minimal setup requirement. It provides sensible defaults out of the box, which means you can start using it in your project with little to no initial configuration.

Optimistic Updates for a Better User Experience: React Query supports optimistic updates, allowing your UI to respond to user interactions immediately, without waiting for server responses. This results in a more responsive and engaging user experience.

Built-in Devtools for Easier Debugging: React Query comes with built-in devtools that make it easier to debug and understand what is happening with your queries and mutations. This can be a significant time-saver during development.

Reduced Boilerplate and Improved Code Readability: By abstracting away the complexities of data fetching and synchronization, React Query helps in reducing boilerplate code. Your codebase becomes more readable and easier to maintain.

Scalability and Performance Optimization: React Query provides various features for performance optimization like query deduplication, pagination, and lazy loading. This makes it suitable for applications of any size, from small to large-scale projects.

### axios

- Description: A promise-based HTTP client that is both browser and node.js friendly.
- Role in Project:

Promise-Based HTTP Client: Axios is a promise-based HTTP client, meaning it handles asynchronous requests with ease. This is crucial for web applications, where operations like fetching data from a server are inherently asynchronous. Using promises, Axios ensures that your application can handle these operations efficiently, avoiding callback hell and improving code readability.

Browser and Node.js Compatibility: Axios works seamlessly both in the browser and in Node.js environments. This compatibility is beneficial for projects that have both client-side and server-side components, allowing for a consistent HTTP client across different parts of your application.

Simplified HTTP Requests: Axios simplifies the process of making HTTP requests. It provides a clean and easy-to-use API for sending requests and receiving responses. This abstraction reduces the complexity involved in directly using the XMLHttpRequest or fetch API and helps in writing cleaner, more maintainable code.

Efficient Data Retrieval and Submission: In your project, Axios is employed for all HTTP communications to efficiently fetch and submit data. Whether it's retrieving data from APIs or sending data back to the server, Axios provides a reliable and streamlined way to manage these operations.

Intercepting Requests and Responses: Axios allows you to intercept HTTP requests and responses. This feature is particularly useful for implementing global request handling, logging, authentication, or error handling patterns across your application.

Automatic Data Transformation: Axios automatically transforms request and response data. It can convert JSON data to/from a JavaScript object without manual parsing. This automatic transformation simplifies the handling of JSON data, which is a common format for API communication.

Customizable Configuration: Axios offers a high degree of customization. You can configure global settings like headers, response timeout, base URL, etc., which is especially useful when interacting with different APIs that require specific configurations.

Widespread Adoption and Community Support: Axios is widely used in the JavaScript community, ensuring robust community support, frequent updates, and a wealth of documentation and resources. This makes integrating and troubleshooting Axios in your project easier.

### react-router-dom

- Description: A DOM bindings library for React Router, which is the standard routing library for React.
- Role in Project:

Standard Routing Solution for React: React Router is the de-facto standard for routing in React applications. react-router-dom provides DOM bindings for React Router, making it ideal for web applications like your dashboard. It allows you to define routes and navigation in your app, which is essential for a multi-page application.

Seamless Navigation Between Screens: In your dashboard, react-router-dom plays a crucial role in managing the navigation between different screens or views. This ensures that users can easily move through various parts of the dashboard, accessing different metrics and data points without page reloads, which contributes to a smoother user experience.

Dynamic Routing Capabilities: react-router-dom supports dynamic routing, meaning routes can be defined as part of the component hierarchy. This aligns well with React’s component-based architecture and allows for more intuitive and maintainable route configuration.

URL-Based Navigation: By leveraging URL-based navigation, react-router-dom ensures that the state of the application is linked to the URL. This is crucial for user experience, as it enables bookmarking, browser history navigation, and direct navigation to a specific view by entering a URL.

Component-Based Approach to Routing: React Router allows for a component-based approach to defining routes, which means you can encapsulate routing logic with your component logic. This makes your code more modular and easier to understand and maintain.

Lazy Loading and Code Splitting: react-router-dom supports lazy loading and code splitting out of the box. This means you can load components only when they are needed, which can significantly improve the initial load time of your dashboard.

Customizable and Extensible: React Router offers extensive customization options. You can create custom link components, use route guards for protecting certain areas of your application, and dynamically modify routes as needed.

Integration with Other Libraries: It integrates well with other libraries and frameworks, allowing you to create complex, feature-rich applications. For instance, it works well with state management libraries, authentication services, and more.

By focusing on these points, you can effectively communicate how react-router-dom contributes to your dashboard by facilitating efficient and intuitive navigation between different views, thereby enhancing the overall user experience and maintainability of your application.

## Getting Started

The following instructions will guide you through the setup process to get the dashboard up and running on your local machine:

git clone https://github.com/sina-ss/rayka-eyesp-dashboard
cd rayka-eyesp-dashboard
npm install
npm run dev

## Project Structure

In our Rayka-eyesp Dashboard project, we have meticulously designed a well-organized directory structure to enhance scalability, maintainability, and overall development efficiency. The following breakdown provides detailed insights into each directory and configuration file:

### **Directories**

#### **`/dist`**

This directory houses the compiled distribution of the project. Notably, the `dist.zip` archive encapsulates the project's distribution, and the `index.html` file serves as the primary entry point.

### **`/public` Directory**

1. **data:**

   - The `data` folder contains various JSON files that store structured data used within the project. These files serve as a source of information, for dynamic content, configurations, or other essential datasets. The specific files include:
     - `category.json`
     - `ISPData.json`
     - `provinceCompare.json`
     - `provincesCoords.json`
     - `server_status.json`

2. **images:**
   - Within the `images` folder, public image assets are stored. These images may be directly referenced or linked to from the project, contributing to the visual elements of the application.

### **`/assets` Directory**

1. **fonts:**

   - This folder contains font files used in the application. Fonts play a crucial role in defining the visual style and readability of text across the application.

2. **images:**
   - The `images` folder holds static image assets used throughout the application. These images could include icons, logos, or other visual elements contributing to the overall user interface.

### **`/components`**

Within the `/components` directory, there are two subdirectories:

### **`/components/icons`**

**RefreshIcon.tsx:**
This component, `RefreshIcon`, is a custom icon implemented using MUI (Material-UI) `SvgIcon` component. It displays a refresh icon with a specific design. This icon is likely used to symbolize a refresh or reload action in the application.

### **`/components/ui` Directory**

1. **AnimatedCircle.tsx:**

   - Component for displaying an animated circle, likely used for visual effects.

2. **Button.tsx:**

   - Generic button component, suitable for various interactive elements.

3. **CircularChart.tsx:**

   - Component for rendering circular charts, used for visualizing data in a circular format.

4. **CustomTable.tsx:**

   - Custom table component, providing additional features or styling beyond a standard HTML table.

5. **CustomTooltipMessage.tsx:**

   - Component for creating custom tooltip messages, enhancing user interactions.

6. **GridItem.tsx:**

   - Grid item component commonly utilized in grid layouts for organizing UI elements.

7. **Header.tsx:**

   - Header component, likely serving as a top-level section header in different parts of the application.

8. **HeaderButton.tsx:**

   - Button component designed specifically for header sections, ensuring cohesive UI styling.

9. **InfoBox.tsx:**

   - Component representing an informational box, used for displaying context-specific information.

10. **Map.tsx:**

    - Map component, used to render maps within the application.

11. **ModalNotData.tsx:**

    - Modal component intended for displaying messages when no data is available.

12. **PulseCircle.tsx:**

    - Component displaying a pulsating circle, typically used as a loading or dynamic effect indicator.

13. **PulsedNumber.tsx:**

    - Component for rendering numbers with a pulsating effect, adding visual interest.

14. **SelectButton.tsx:**

    - Button component specifically designed for selection actions, ensuring a consistent UI pattern.

15. **StatusTooltip.tsx:**

    - Tooltip component focused on displaying status-related information.

16. **TaggedText.tsx:**

    - Component for rendering text with tags, possibly used for labeling or categorizing information.

17. **TransformData.tsx:**
    - Component related to data transformation, handling data processing or conversion logic.

These components collectively contribute to a well-organized and modular UI structure, enhancing reusability and maintainability throughout the application.

##### **`/context`**

**messageContext.tsx:** This file defines a React context named `MessageContext` and its provider `MessageProvider`. The context is created to manage and share the state related to a message within the application. The `MessageProvider` component wraps its children, providing them with the `message` state and a function `setMessage` to update the message. This allows components within the application to access and modify the shared message state.

##### **`/features`**

1. **charts:** Handles components and logic related to charts.
2. **dashboard:** Manages components and functionalities for the main dashboard.
3. **disorderHistory:** Deals with components and features related to disorder history.
4. **lastDisorders:** Involves components and functionalities for displaying the last disorders.
5. **notfound:** Contains components and features related to the "not found" page.
6. **private_dashboard:** Manages components and logic for the private dashboard.

### `/hook` Directory

file defines a React hook, `useFetchServers`, which manages server-related states and functions. It fetches server data, calculates server latency, and identifies the best-performing server. The hook provides states like `servers`, `isFetchingServers`, and `bestServerUrl` for use in React components.

### `/layout` Directory

#### **`global.css` - Global Styles**

The `global.css` file in the `layout` directory contains global styles, including font-face definitions, scrollbar styles, and other CSS rules.

- **Font-face Definitions:**

  - Defines `@font-face` rules for various font families with different weights (`PeydaThin`, `PeydaExtralight`, ..., `PeydaBlack`), each referencing corresponding font files.

- **Link Styles:**

  - Sets `text-decoration: none` for all anchor (`a`) elements.

- **Body Styles:**

  - Sets the background of the body to a linear gradient (`BACKGROUND_GRADIENT`), using dark colors (`#2C2E32` and `#0F1114`).
  - Sets the default font family for the body to `PeydaRegular`.

- **Scrollbar Styles:**

  - Defines styles for the webkit scrollbar, including width, track styles, thumb styles, and button styles.

- **Pulse Animation:**

  - Defines a pulse animation using keyframes, creating a pulsating effect on elements with the class `.pulse-circle`.

- **`:after` Pseudo-Element Styles:**
  - Adds styles for the `::after` pseudo-element of elements with the class `.pulse-circle`, creating a circular pulse effect.

#### **`theme.ts` - MUI Theme Configuration**

The `theme.ts` file in the `layout` directory configures the Material-UI theme for the application.

- **Custom Breakpoint:**

  - Extends the Material-UI theme with a custom breakpoint (`x2: 1920`).

- **Global Styles:**

  - Configures the global styles for the application, including direction (`rtl`), dark mode, background gradient, and text color.

- **Typography Styles:**

  - Defines typography styles for various HTML elements, specifying font sizes, font families, and weights.

- **Component Styles:**

  - Overrides styles for the `MuiCssBaseline` component, setting a fixed background.

- **Breakpoints:**
  - Defines custom breakpoint values for `xs`, `sm`, `md`, `lg`, `xl`, and the new breakpoint `x2`.

This file provides a centralized place for configuring and customizing the Material-UI theme for the application, making it easy to maintain a consistent look and feel across different components.

### `/lib` Directory

#### **`MapHelper.ts` - Map Helper Module**

The `MapHelper.ts` module, located in the `lib` folder, provides helper functions related to mapping and processing data for provinces. Here's an overview of its contents:

- **Imports:**

  - Imports the `api` module from the `services` directory for making API requests.

- **Type Definitions:**

  - Defines the `ProvinceCoordsType` type, representing the coordinates and size of provinces.

- **Function: `getProvinceData`**

  - Asynchronously fetches data for Tehran, Alborz, and Ahvaz provinces using the `api.pingStatuses` service.
  - Processes the received data and returns an array of objects, each containing information about a province.
  - Each province object includes an `id`, `name`, `color` based on `IXP` and `IGW` statuses, and additional information about the status of `IGW` and `IXP` with their corresponding colors.

- **Constant: `mockProvinceListsForPrivate`**

  - A mock object representing province lists for private use, with predefined colors for Tehran, Qom, and Isfahan.

- **Functions: `getColor`, `getStateColor`, `getStatus`**
  - Helper functions that determine the color, state color, and status based on the provided parameters.

This module is designed to encapsulate the logic related to mapping and processing province data, providing clean and reusable functions for the application.

### **`/pages/private` - Private Dashboard Pages**

The `/pages/private` directory contains React components dedicated to the private dashboard pages. Each component serves a specific purpose and contributes to the comprehensive functionality of the private dashboard. Below, you'll find detailed explanations for each component within this directory.

#### **`Average.tsx` - Average Metrics Page**

This page, represented by `Average.tsx`, is designed to display average metrics related to network performance. The component utilizes circular charts to visualize average download speed, upload speed, ping time, and jitter. Additionally, it features tagged text displaying relevant information such as global ranking, national ranking, date, and time. The user can dynamically change the sorting category. The component fetches data asynchronously from the server and provides a visually appealing representation of network metrics.

#### **`Chat.tsx` - Chatbot Page**

The `Chat.tsx` component represents a simplistic chatbot page. It utilizes the `MessageContext` to access and display messages received from the chatbot. This component allows users to interact with the chatbot within the dashboard.

#### **`Disorders.tsx` - Disorder History Page**

The `Disorders.tsx` component serves as a bridge to the `DisorderHistory` feature. This feature provides a comprehensive view of disorder history, offering insights into past network disruptions and their details.

#### **`LastDisorders.tsx` - Last Disorders Page**

The `LastDisorders.tsx` component connects to the `LastDis` feature, displaying information about the most recent network disorders. Users can quickly access and review the latest disruptions through this page.

#### **`PrivateDashboard.tsx` - Main Private Dashboard Page**

The `PrivateDashboard.tsx` component represents the main page of the private dashboard. It offers a centralized view with a dynamic layout that adapts to various screen sizes. The page includes a left side, a map, and a right side. The left side and right side components contain specific information and functionalities relevant to the private dashboard, while the map provides a visual representation of network data. The page also employs responsive design principles to ensure an optimal viewing experience across different devices.

### **`/pages/public` - Public Dashboard Pages (Contd.)**

#### **`CurrentTraffic.tsx` - Current Traffic Page**

The `CurrentTraffic.tsx` component is responsible for displaying current traffic data with interactive charts. It allows users to visualize different traffic metrics for selected cities, providing filters for customization. The component dynamically loads charts for IXP (Internet Exchange Point) and IGW (Internet Gateway) and offers a responsive design. Users can filter data based on ISP (Internet Service Provider), province, and category, enhancing the flexibility of data exploration.

#### **`Dashboard.tsx` - Main Dashboard Page**

The `Dashboard.tsx` component represents the primary page of the public dashboard. It features a responsive layout, adapting to different screen sizes. The page includes a left side, a map, and a right side. The left and right side components contain specific information and functionalities relevant to the public dashboard. The map provides a visual representation of network data. The component also includes a screenshot feature, allowing users to capture and download a map screenshot.

#### **`GlobalOverview.tsx` - Global Overview Page**

The `GlobalOverview.tsx` component offers a comprehensive view of server status and analysis results. It fetches data from specific endpoints based on the type (internal or external). The page displays server status information in a grid layout, utilizing the `GridItem` component for each data item. Users can navigate back to the main dashboard and explore server data with responsive design principles in mind.

#### **`HistoryOperators.tsx` - Historical Disruptions Page**

The `HistoryOperators.tsx` component is responsible for rendering a table that displays historical disruptions. It utilizes the `CustomTable` component to present disruption data, including information such as date, hour, category, cause, and handling status. Users can toggle between recent and current disruptions using buttons, enabling dynamic data filtering. The component fetches data from the server and efficiently updates the table based on user interaction. Responsive design ensures a seamless user experience across various screen sizes.

#### **`operators.tsx` - Operators Overview Page**

The `Operators.tsx` component serves as the main page for operator information and charts. It incorporates Material UI components, custom components like `Chart`, and the previously mentioned `HistoryOperators` component. Users can filter data based on provinces, ISPs (Internet Service Providers), and time categories. The page provides charts depicting network metrics, operator details, and historical disruptions. The responsive layout ensures optimal viewing on different devices.

#### **`ResultTest.tsx` - Test Results Presentation Page**

The `ResultTest.tsx` component handles the presentation of network test results. It showcases key details such as connection type, server location, and download/upload speeds. The component uses visual elements, including logos and icons, to enhance the user interface. The presentation is well-structured, featuring a gradient background and organized information sections. Users can quickly interpret test results, making it a user-friendly component for displaying network performance metrics.

#### **`speedtest.tsx` - Speed Test Page**

The `speedtest.tsx` component is responsible for the Speed Test feature of the application. It incorporates various functionalities to measure download and upload speeds, display visual elements, and provide real-time feedback to the user. Here's an overview of key aspects:

- **State Management:**

  - Manages various states such as `hoverButton`, `startTest`, `startAnimate`, `_status`, `_latency`, `download`, `upload`, and more to control the flow and appearance of the Speed Test.

- **Socket Connection:**

  - Establishes a socket connection to the selected server using the Socket.io library.
  - Listens for server responses, including latency (ping) updates.

- **Server Selection:**

  - Fetches a list of servers and selects the best server for the test, ensuring optimal performance.

- **UI and Animation:**

  - Utilizes Material UI components and custom stylings to create an engaging and responsive user interface.
  - Incorporates animations for the start button, server selection, and visual elements during the test.

- **Speed Test Logic:**

  - Utilizes the `window.speedtest` object to manage the speed test process.
  - Dynamically updates visual elements based on the progress of the download and upload phases.
  - Calculates and displays latency, download, and upload speeds.

- **Visual Feedback:**

  - Provides visual feedback using images and gradients to represent download and upload progress.
  - Utilizes pulsating numbers to display changing values during the test.

- **Responsive Design:**
  - Ensures a responsive layout that adapts to different screen sizes, providing a consistent user experience.

This component offers users an interactive and visually appealing experience while testing their network speeds. It seamlessly integrates with the overall structure of the public interface, contributing to a feature-rich application.

### **`/routes` - Navigation and Routing Configuration**

The `/routes` directory is a vital component of our application, orchestrating seamless navigation within the dashboard. It encompasses components and configurations essential for managing the application's routing. Below is an in-depth explanation of the `Routes.tsx` file, illustrating its role in defining and organizing routes:

#### **Routes.tsx**

This module serves as the centralized configuration for the application's routes, employing React's lazy loading for optimized performance. Each route object within the `mainRoutes` and `privateMainRoutes` arrays specifies a path, corresponding React element, and a title for the associated page. This structured approach facilitates easy navigation and ensures a clear hierarchy within the application.

##### **`mainRoutes`**

- **`Dashboard`**: Represents the main dashboard page accessible through the root path (`/`).
- **`GlobalOverview`**: Provides an overview of global statistics and is accessible via the `/global-overview` path.
- **`Disorders`**: Navigates to the disorders page, accessible through the `/disorders` path.
- **`ISP`**: Directs users to the ISP-related information page via the `/isp` path.
- **`LastDisorders`**: Displays information about the last disorders and is accessible through the `/last-disorders` path.
- **`SpeedTest`**: Leads to the speed test page and can be accessed via the `/speed-test` path.
- **`NotFound`**: Represents a fallback route for any paths not matching the specified routes, displaying a "Not Found" page.

##### **`privateMainRoutes`**

- **`PrivateDashboard`**: Serves as the private dashboard accessible through the `/private` path.
- **`Average`**: Navigates to a page displaying all averages, accessible via the `/private/average` path.
- **`Chart`**: Leads to a page featuring a chatbot and is accessible through the `/private/chat` path.
- **`Operators`**: Directs users to the operators page via the `/private/operators` path.
- **`CurrentTraffic`**: Displays information about current traffic and is accessible through the `/private/current-traffic` path.

By structuring our routes in this manner, we enhance code maintainability and navigation clarity within the dashboard, ensuring a robust and scalable user experience. The lazy loading approach also optimizes the application's performance by loading components only when required, contributing to a more responsive user interface.

### **`/services` - Centralized Backend Services**

The `/services` directory houses a multitude of essential files, each contributing to the seamless handling of backend interactions and API calls. Let's delve into key components within this directory:

#### 1. **`chart.ts`**

The `chart.ts` module orchestrates the retrieval of chart data, catering to different time intervals (years, months, weeks, and days). It interacts with the backend, fetching and processing data for visual representation in the dashboard. This separation ensures a modular approach to managing various chart-related functionalities.

#### 2. **`clientApi.ts`**

The `clientApi.ts` file encapsulates the configuration and setup of Axios, a popular HTTP client. It establishes a client instance with predefined settings such as baseURL and timeout. Additionally, it incorporates interceptors for request and response, handling tasks like token insertion and extraction. This modular design promotes maintainability and extensibility for backend communication.

#### 3. **`config.ts`**

The `config.ts` module serves as a centralized configuration hub, defining parameters such as the root address, timeout, and token names. This file plays a crucial role in maintaining consistency across the application and ensures seamless integration with the backend.

#### 4. **`globaloverview.ts`**

The `globaloverview.ts` module acts as an index file, aggregating various services related to states, ping statuses, information, history, ISP ranking, metrics, and charts. This consolidated approach enhances clarity and provides a convenient entry point for accessing diverse functionalities within the dashboard.

#### 5. **`pingstatus.ts`**

The `pingstatus.ts` file handles the retrieval of ping statuses from different locations. It includes functions to fetch the ping status and state for Tehran, Alborz, and Ahvaz. The modular structure allows for easy extension to include additional locations or functionalities related to monitoring ping statuses.

#### 6. **`storage.ts`**

The `storage.ts` module abstracts local storage operations, providing convenient methods for getting, setting, and removing data. This utility simplifies data management and promotes a consistent approach to handling client-side storage.

#### 7. **`dashboard` Directory**

The `/dashboard` directory contains multiple files, each focusing on specific aspects of the dashboard:

- **`history.ts`**: Manages the retrieval of historical data, including all issues, open issues, and resolved issues.

- **`info.ts`**: Handles information related services, retrieving details such as download and ping information based on city, ISP, and issue type.

- **`ISPRanking.ts`**: Facilitates ISP ranking services, fetching and processing data to showcase the ranking of ISPs.

- **`metrics.ts`**: Provides services for metrics, offering insights into various parameters like download and upload averages, speed, ping, packet loss, and jitter.

- **`state.ts`**: Manages services related to the overall state of the application, including counts and details about issues, ISPs, cities, and their interdependencies.

These modular services collectively contribute to a robust and maintainable architecture, ensuring efficient communication with the backend and seamless data flow within the Rayka-eyesp Dashboard.

### **`/utils` - Modular Utility Functions**

The `/utils` directory serves as a repository for essential utility functions, designed to streamline common tasks and foster a modular, reusable codebase. Here's an overview of the utility functions encapsulated within this directory:

#### 1. **`convertToEnglishNumbers.ts`**

This utility function, `convertToEnglishNumbers`, facilitates the conversion of Persian numeral strings to their English counterparts. It employs an array mapping approach to replace each Persian numeral in a given string, providing a standardized representation compatible with English numerals.

#### 2. **`convertToPersianDate.ts`**

The `convertToPersianDate` function transforms a provided date string into a formatted Persian date string. Leveraging the Intl.DateTimeFormat API, it ensures accurate formatting based on the Persian calendar, including details such as year, month, day, hour, minute, and second.

#### 3. **`convertWindowToScaleForMap.tsx`**

The `convertWindowToScaleForMap` module calculates an appropriate scale factor based on the current window width. It dynamically adjusts the scale for mapping purposes, catering to various screen sizes. This responsive approach ensures optimal visualization on a diverse range of devices.

#### 4. **`types.ts`**

The `types.ts` file defines a set of TypeScript types crucial for maintaining a structured and type-safe codebase. These types include:

- **`Detail`**: Represents a time-stamped status detail.
- **`Details`**: An array of `Detail` instances.
- **`StatusDetail`**: Contains detailed information about a status, including time, status message in Persian, color, and time range.
- **`HourlyStatus`**: Captures hourly status details, organized by hour.
- **`WebsiteData`**: Defines the structure for website-related data, encompassing name, URL, date, and hourly status information.

By encapsulating these types, the `/utils/types.ts` module promotes consistency and clarity in data structures throughout the application, enhancing maintainability and code readability.

##### **`/src-tauri`**

## Cross-Platform Application Support

To enable cross-platform functionality for our Rayka-eyesp Dashboard, we've designated a dedicated folder named `src-tauri`. This folder encapsulates Tauri-specific configurations and code, ensuring distinct settings tailored for compatibility across Windows, macOS, and Linux operating systems. This strategic separation enhances organizational clarity, streamlining the development of a versatile application that can seamlessly run on various platforms.

### **Files**

#### **`.eslintrc.cjs`**

Configuration file for ESLint, ensuring consistent code quality and adherence to coding standards.

#### **`.gitignore`**

A file listing exclusions for Git version control, preventing the tracking of unnecessary files and directories.

#### **`package-lock.json` and `package.json`**

Manifest files specifying project dependencies and scripts, ensuring consistent and reproducible builds.

#### **`tsconfig.json` and `tsconfig.node.json`**

TypeScript configuration files defining compiler options and enforcing type safety, ensuring a robust development experience.

#### **`vite.config.ts`**

Configuration file for Vite, a tool optimizing the development and build processes. It plays a crucial role in expediting serving and building capabilities.
