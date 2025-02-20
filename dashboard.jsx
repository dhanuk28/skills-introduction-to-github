import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Package, TrendingUp, AlertTriangle } from 'lucide-react';

const DeliveryDashboard = () => {
  // Sample data for existing charts
  const deliveryRateData = [
    { days: '0-3', rate: 27 },
    { days: '4-7', rate: 30 },
    { days: '8-12', rate: 40 }
  ];

  // New data for pie chart
  const deliveryStatusData = [
    { name: 'On Time', value: 65, color: '#22c55e' },
    { name: 'Delayed', value: 20, color: '#eab308' },
    { name: 'Late', value: 15, color: '#ef4444' }
  ];

  // New data for gauge chart
  const onTimeDeliveryScore = 85;
  const gaugeData = [
    { name: 'Score', value: onTimeDeliveryScore, color: '#3b82f6' },
    { name: 'Remaining', value: 100 - onTimeDeliveryScore, color: '#e5e7eb' }
  ];

  const metrics = [
    { title: "Order Processing Time", value: "24hrs", icon: Clock, description: "Average time from order receipt to dispatch" },
    { title: "Order Accuracy Rate", value: "98.5%", icon: TrendingUp, description: "Total orders without complaints" },
    { title: "Back Order Rate", value: "3.2%", icon: AlertTriangle, description: "Sales return percentage" },
    { title: "Avg Delivery Time", value: "15 days", icon: Package, description: "Average time from dispatch to delivery" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Delivery Performance Dashboard</h2>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <metric.icon className="h-6 w-6 text-blue-600" />
                <h3 className="font-semibold text-sm">{metric.title}</h3>
              </div>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
              <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Delivery Rate Chart */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Delivery Rate Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deliveryRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="days" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rate" fill="#3b82f6" name="Delivery Rate (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* New Pie Chart */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Delivery Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deliveryStatusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                  >
                    {deliveryStatusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Shipment Score Card */}
        <Card>
          <CardHeader>
            <CardTitle>Shipment Performance Scorecard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold">Average Delivery Time</h4>
                <p className="text-2xl font-bold text-blue-600">15 days</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold">Shipment Delay Rate</h4>
                <p className="text-2xl font-bold text-blue-600">5.2%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Gauge Chart */}
        <Card>
          <CardHeader>
            <CardTitle>On-Time Delivery Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gaugeData}
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    cx="50%"
                    cy="100%"
                    outerRadius={100}
                    innerRadius={60}
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="100%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-2xl font-bold"
                    fill="#1e3a8a"
                  >
                    {onTimeDeliveryScore}%
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryDashboard;