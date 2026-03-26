$images = @(
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/992541-anton-768x1024-1.webp"; name = "anton-van-heerden.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/222263-Marina-768x1024-1.webp"; name = "marina-nolte.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/997169-wilna-768x1024-1.webp"; name = "wilna-van-heerden.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/762404-Annelie-768x1024-1.webp"; name = "annelie-visser.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/27023-zanelle-768x1024-1.webp"; name = "zanele-shingange.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/80826-Annette-768x1024-1.webp"; name = "annette-niemand.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/405603-Jaqoline-768x1024-1.webp"; name = "jaqoline-frauendorf.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/805747-kate-768x1024-1.webp"; name = "kate-ngobeni.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/496585-maritza-768x1024-1.webp"; name = "maritza-ferreira.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/157966-Liesel-768x1024-1.webp"; name = "liesel-joubert.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/284066-melanie-775x1024-1.webp"; name = "melanie-prece.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/572915-ronel-768x1024-1.webp"; name = "ronel-owens.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/780860-shaun-768x1024-1.webp"; name = "shaun-mostert.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/720519-Ilze-768x1024-1.webp"; name = "ilze-erasmus.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/872855-Tanya-798x1024-1.webp"; name = "tanya-janse-van-vuuren.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/854096-sinah-768x1024-1.webp"; name = "sinah-mothibe.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/171872-johan-768x1024-1.webp"; name = "johan-louw.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/566815-michael-768x1024-1.webp"; name = "michael-du-preez.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/955570-thandeka-768x1024-1.webp"; name = "thandeka-khyolo.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/543078-Lynette-768x1024-1.webp"; name = "lynette-pieterse.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/199745-Nezelle-768x1024-1.webp"; name = "nezelle-jordaan.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/502562-linda-768x1024-1.webp"; name = "linda-venter.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/657242-elenor-768x1024-1.webp"; name = "elenor-luwes.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/338513-natalie-768x1024-1.webp"; name = "natalie-hagedorn-hansen.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/34414-levashni-768x1024-1.webp"; name = "levashni-moonsamy.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/623009-chandre-768x1024-1.webp"; name = "chandre-gouws.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/96122-Leigh-768x1024-1.webp"; name = "leigh-nel.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/uploads/2023/04/780227-Hannelie-768x1024-1.webp"; name = "hannelie-joubert.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/webp-express/webp-images/uploads/2023/05/Lynette-Cruywagen.jpg.webp"; name = "lynette-cruywagen.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/webp-express/webp-images/uploads/2023/05/Anneri-Swanepoel.jpg.webp"; name = "anneri-swanepoel.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/webp-express/webp-images/uploads/2024/08/Jana.jpeg.webp"; name = "jana-blignaut.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/webp-express/webp-images/uploads/2023/07/Petru-DNA.jpg.webp"; name = "petru-herbst.webp" },
    @{ url = "https://dnaoutsourcing.com/wp-content/webp-express/webp-images/uploads/2023/10/Mariska-Griesel-1.jpg.webp"; name = "mariska-griesel.webp" }
)

$outputDir = $PSScriptRoot
foreach ($img in $images) {
    $outPath = Join-Path $outputDir $img.name
    Write-Host "Downloading $($img.name)..."
    try {
        Invoke-WebRequest -Uri $img.url -OutFile $outPath -ErrorAction Stop
    } catch {
        Write-Host "Failed: $($img.name) - $_"
    }
}
Write-Host "Done! Downloaded $($images.Count) images."
