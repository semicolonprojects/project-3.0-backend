<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Invoice - Nettoyer.Shoes</title>
    <style>
        /* General Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            margin: 30px;
            background-color: #f9fbfd;
            color: #333;
        }

        h1 {
            font-size: 36px;
            color: #2c3e50;
            border-bottom: 3px solid #FFB62B;
            padding-bottom: 10px;
            margin-bottom: 20px;
            text-align: center;
        }

        h2, h3 {
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .header-table {
            width: 100%;
            margin-bottom: 40px;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header-table td {
            vertical-align: top;
            padding: 10px;
        }

        .header-table h3 {
            font-size: 18px;
            color: #2c3e50;
        }

        .header-table p {
            font-size: 16px;
            margin: 5px 0;
        }

        .image-placeholder {
            text-align: center;
            margin: 20px 0;
        }

        .image-placeholder img {
            max-width: 200px;
            height: auto;
        }

        .image-items {
            text-align: center;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
            margin: 20px 0;
        }

        .image-items img {
            width: 50%;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
            background-color: #ffffff;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            overflow: hidden;
        }

        th, td {
            padding: 15px;
            text-align: left;
            border-bottom: 1px solid #ddd;
            font-size: 14px;
        }

        th {
            background-color: #FFB62B;
            color: white;
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .total-row td {
            font-weight: bold;
            background-color: #f8f8f8;
        }

        .currency {
            font-weight: bold;
            color: #FFB62B;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
            color: #666;
        }

        .footer a {
            color: #FFB62B;
            text-decoration: none;
            font-weight: bold;
        }

        .page-break {
            page-break-before: always;
        }
    </style>
</head>

<body>
    <h1>Invoice</h1>

    <table class="header-table">
        <tr>
            <td>
                <h2>INVOICE TO</h2>
                <p><strong>{{ $model->nama_pelanggan }}</strong></p>
                <p><strong>{{ $model->kode_resi }}</strong></p>
            </td>
            <td style="text-align: right;">
                <h3>ENTRY DATE</h3>
                <p>{{ \Carbon\Carbon::parse($model->created_at)->format('j F Y') }}</p>
            </td>
        </tr>
    </table>

    <div class="image-placeholder">
        <img src="{{ public_path('logo1.jpg') }}" alt="Nettoyer.Shoes Logo">
    </div>

    <table>
        <thead>
            <tr>
                <th>Items</th>
                <th>Treatment</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
            @php $total = 0; @endphp
            @foreach ($model->nama_item as $item)
                @foreach ($item['service_id'] as $index => $service)
                    <tr>
                        @if ($index == 0)
                            <td rowspan="{{ count($item['service_id']) }}">{{ $item['nama_item'] }}</td>
                        @endif
                        <td>{{ $service['nama_service'] }}</td>
                        <td class="currency">@currency($service['price'])</td>
                    </tr>
                    @php $total += $service['price']; @endphp
                @endforeach
            @endforeach
            <tr class="total-row">
                <td colspan="2">Shipping Cost</td>
                <td class="currency">@currency($model->ongkir)</td>
            </tr>
            <tr class="total-row">
                <td colspan="2">Total</td>
                <td class="currency">@currency($total + $model->ongkir)</td>
            </tr>
        </tbody>
    </table>

    <div class="page-break"></div>
    <h1>Your Item Picture</h1>
    <div class="image-items">
        @forelse ($images as $image)
            <img src="{{ public_path('storage/public/cek_resi/' . $image->name) }}" alt="{{ $image->name }}" />
        @empty
            <p>No image found.</p>
        @endforelse
    </div>

    <div class="footer">
        <p>Thank you for choosing Nettoyer.Shoes!</p>
        <p>If you have any questions, please contact us on
            <a href="https://wa.me/{{ $phoneNumber->nomor }}" target="_blank">WhatsApp</a>
        </p>
    </div>
</body>

</html>