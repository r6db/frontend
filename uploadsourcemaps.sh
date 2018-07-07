#!/bin/bash

if [[ -z "${VERSION}" ]]; then

    echo "No VERSION set, skipping file upload"

else

    # Create release
    curl $SENTRYURL/api/hooks/release/builtin/2/85e2d7d2ab9add7563cdafaecbd46596ab4c8b8058829832df751e3aca30d089/ \
        -X POST \
        -H 'Content-Type: application/json' \
        -d "{\"version\": \"$VERSION\"}" -s

    echo ""

    cd build

    for filename in *.js.map; do
        echo "Uploading: $filename"
        curl $SENTRYURL/api/0/projects/r6db/frontend/releases/$VERSION/files/ \
            -X POST \
            -H "Authorization: Bearer $TOKEN" \
            -F file=@$filename \
            -F name="$filename" -s
    done
    exit 0
fi
