"use client"

import { Card } from "@/components/ui/card"

export default function Tables() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tables</h1>
        <p className="text-muted-foreground mt-1">Data tables and records management</p>
      </div>

      <Card className="p-8 flex items-center justify-center min-h-96 text-center">
        <div>
          <p className="text-5xl mb-4">📊</p>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Tables Module</h2>
          <p className="text-muted-foreground">
            This page will display detailed data tables for weather records, forecasts, and analytics.
          </p>
        </div>
      </Card>
    </div>
  )
}
