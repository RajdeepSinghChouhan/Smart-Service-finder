import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import Home from "./components/Home/home";
import SignUp from "./components/SignUp/signup";
import UserDashboard from "./components/Dashboard/UserDashboard/userDashboard";
import ProviderDashboard from "./components/Dashboard/ProviderDashboard/providerDashboard";
import SearchServiceProvider from "./components/SearchServiceProvider/searchServiceProvider";
import EditBooking from "./components/EditBooking/editBooking";
import ViewProvider from "./components/viewProvider/viewProvider";
import ProviderProfile from "./components/Profile/ProviderProfile/providerProfile";
import UserProfile from "./components/Profile/UserProfile/userProfile";
import ProviderPendingBooking from "./components/PendingBookings/providerPendingBooking/ProviderPendingBooking";
import UserPendingBooking from "./components/PendingBookings/userPendingBooking/UserPendingBooking";
import DashboardNavbar from "./components/Navbar/DashboardNavbar/dashboardNavbar";

import Book from "./components/Book/book";
import './App.css';
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
function App() {  
  return(
    <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />

        <Route path="/signup" element={
          <ProtectedRoute>
            <SignUp />
          </ProtectedRoute>} />
        <Route path="/userDashboard" element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>} />
        <Route path="/providerDashboard" element={
          <ProtectedRoute>
            <ProviderDashboard />
          </ProtectedRoute>} />
        <Route path="/searchServiceProvider" element={
          <ProtectedRoute>
            <SearchServiceProvider />
          </ProtectedRoute>} />
        <Route path="/viewProvider" element={
          <ProtectedRoute>
            <ViewProvider />
          </ProtectedRoute>} />
        <Route path="/book" element={
          <ProtectedRoute>
            <Book />
          </ProtectedRoute>} />
        <Route path="/editBooking" element={
          <ProtectedRoute>
            <EditBooking />
          </ProtectedRoute>} />
        <Route path="/providerProfile" element={
          <ProtectedRoute>
            <ProviderProfile />
          </ProtectedRoute>} />
        <Route path="/userProfile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>} />
        <Route path="/providerPendingBookings" element={
          <ProtectedRoute>
            <ProviderPendingBooking />
          </ProtectedRoute>} />
        <Route path="/userPendingBookings" element={
          <ProtectedRoute>
            <UserPendingBooking />
          </ProtectedRoute>} />

          <Route path="/dashboardNavbar" element={
          <ProtectedRoute>
            <DashboardNavbar />
          </ProtectedRoute>} />
    </Routes>
  )
}

export default App;