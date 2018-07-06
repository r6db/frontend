#!/bin/bash

if [[ -z "${VERSION}" ]]; then

    echo "No VERSION set, skipping file upload"

else

    # Create release
    curl $SENTYURL/api/hooks/release/builtin/2/85e2d7d2ab9add7563cdafaecbd46596ab4c8b8058829832df751e3aca30d089/ \
        -H "Authorization: Bearer $TOKEN" \
        -X POST \
        -H 'Content-Type: application/json' \
        -d "{\"version\": \"$VERSION\"}" -s

    echo ""

    for filename in build/*.js.map; do
        echo "Uploading: $filename"
        curl $SENTYURL/api/0/projects/r6db/frontend/releases/$VERSION/files/ \
            -X POST \
            -H "Authorization: Bearer $TOKEN" \
            -F file=@$filename \
            -F name="https://r6db.com/$filename" -s
    done
    exit 0
fi
