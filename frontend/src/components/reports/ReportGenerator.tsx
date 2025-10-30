import { useState } from 'react'
import { FileDown, FileSpreadsheet, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { toast } from 'sonner'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import type { Event } from '../../types'

interface ReportGeneratorProps {
  event: Event
  participants?: any[]
  stats?: any
}

export const ReportGenerator = ({ event, participants = [], stats }: ReportGeneratorProps) => {
  const [loading, setLoading] = useState(false)

  const generatePDF = async () => {
    setLoading(true)
    try {
      const doc = new jsPDF()
      
      // Header
      doc.setFontSize(20)
      doc.setTextColor(59, 130, 246)
      doc.text('Event Report', 14, 20)
      
      // Event Details
      doc.setFontSize(12)
      doc.setTextColor(0, 0, 0)
      doc.text(`Event: ${event.event_name}`, 14, 35)
      doc.text(`Venue: ${event.event_venue}`, 14, 45)
      doc.text(`Date: ${event.event_start_date} to ${event.event_end_date}`, 14, 55)
      doc.text(`Time: ${event.event_time}`, 14, 65)
      
      // Statistics
      if (stats) {
        doc.setFontSize(14)
        doc.text('Event Statistics', 14, 80)
        doc.setFontSize(11)
        doc.text(`Total Participants: ${stats.total_participants || 0}`, 14, 90)
        doc.text(`Registration Rate: ${stats.registration_rate || 0}%`, 14, 100)
      }
      
      // Participants Table
      if (participants.length > 0) {
        autoTable(doc, {
          startY: 115,
          head: [['Name', 'Email', 'Registration Date']],
          body: participants.map(p => [
            p.name || 'N/A',
            p.email || 'N/A',
            p.registration_date || 'N/A'
          ]),
          theme: 'grid',
          headStyles: { fillColor: [59, 130, 246] },
        })
      }
      
      // Footer
      const pageCount = doc.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(10)
        doc.setTextColor(128, 128, 128)
        doc.text(
          `Page ${i} of ${pageCount}`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        )
      }
      
      // Save
      doc.save(`${event.event_name.replace(/\s+/g, '_')}_Report.pdf`)
      toast.success('PDF report generated successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Failed to generate PDF report')
    } finally {
      setLoading(false)
    }
  }

  const generateExcel = async () => {
    setLoading(true)
    try {
      const workbook = XLSX.utils.book_new()
      
      // Event Details Sheet
      const eventData = [
        ['Event Report'],
        [],
        ['Event Name', event.event_name],
        ['Venue', event.event_venue],
        ['Start Date', event.event_start_date],
        ['End Date', event.event_end_date],
        ['Time', event.event_time],
        ['Department', typeof event.department_name === 'string' ? event.department_name : event.department_name.department_name],
      ]
      
      if (stats) {
        eventData.push([])
        eventData.push(['Statistics'])
        eventData.push(['Total Participants', stats.total_participants || 0])
        eventData.push(['Registration Rate', `${stats.registration_rate || 0}%`])
      }
      
      const eventSheet = XLSX.utils.aoa_to_sheet(eventData)
      XLSX.utils.book_append_sheet(workbook, eventSheet, 'Event Details')
      
      // Participants Sheet
      if (participants.length > 0) {
        const participantsSheet = XLSX.utils.json_to_sheet(participants)
        XLSX.utils.book_append_sheet(workbook, participantsSheet, 'Participants')
      }
      
      // Save
      XLSX.writeFile(workbook, `${event.event_name.replace(/\s+/g, '_')}_Report.xlsx`)
      toast.success('Excel report generated successfully!')
    } catch (error) {
      console.error('Error generating Excel:', error)
      toast.error('Failed to generate Excel report')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Event Report</CardTitle>
        <CardDescription>
          Download detailed event reports in PDF or Excel format
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button
          onClick={generatePDF}
          disabled={loading}
          className="flex-1"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileDown className="mr-2 h-4 w-4" />
          )}
          Download PDF
        </Button>
        <Button
          onClick={generateExcel}
          disabled={loading}
          variant="outline"
          className="flex-1"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileSpreadsheet className="mr-2 h-4 w-4" />
          )}
          Download Excel
        </Button>
      </CardContent>
    </Card>
  )
}
