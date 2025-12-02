"use client"

import { Card } from "@/components/ui/card"

export default function Notifications() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground mt-1">Manage your weather alerts and notifications</p>
      </div>

      <Card className="p-8 flex items-center justify-center min-h-96 text-center">
        <div>
          <p className="text-5xl mb-4">🔔</p>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Notifications Module</h2>
          <p className="text-muted-foreground">
            Weather alerts, system notifications, and personalized recommendations will appear here.
          </p>
        </div>
      </Card>
    </div>
  )
}
