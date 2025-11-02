'use client'

import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from './ui/button'
import { Document, Page, View, pdf, Image, StyleSheet, Text } from '@react-pdf/renderer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import QRCode from 'qrcode'

interface QRCodeGeneratorProps {
  url: string
  title?: string
  description?: string
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  qrContainer: {
    marginBottom: 20
  },
  title: {
    marginBottom: 10,
    fontSize: 24,
    fontFamily: 'Helvetica-Bold'
  },
  description: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Helvetica'
  }
})

export const QRCodeGenerator = ({ url, title = 'QR Code', description = 'Scanner pour accéder à la page' }: QRCodeGeneratorProps) => {
  const qrRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')

  useEffect(() => {
    setIsClient(true)
    QRCode.toDataURL(url, {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    }).then(setQrDataUrl)
  }, [url])

  const handleDownloadPDF = async () => {
    const QRDocument = () => (
      <Document>
        <Page size="A4">
          <View style={styles.page}>
            {title && <Text style={styles.title}>{title}</Text>}
            {description && <Text style={styles.description}>{description}</Text>}
            <View style={styles.qrContainer}>
              <Image src={qrDataUrl} style={{ width: 400, height: 400 }} />
            </View>
          </View>
        </Page>
      </Document>
    )

    const blob = await pdf(<QRDocument />).toBlob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `qrcode-${title.toLowerCase().replace(/\s+/g, '-')}.pdf`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  if (!isClient) return null

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className='text-center'>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={qrRef} className="flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG value={url} size={200} />
          </div>
          <Button onClick={handleDownloadPDF} className="mt-4">
            Télécharger en PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}