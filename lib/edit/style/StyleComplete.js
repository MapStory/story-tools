exports.StyleComplete = function() {
    return {
        isComplete: function(style) {
            if (style.classify) {
                if (style.classify.method === "unique") {
                    if (style.classify.attribute === null || !style.classify.colorPalette) {
                        return false;
                    }
                } else if (style.classify.method === null || style.classify.attribute === null || style.classify.colorRamp === null || style.rules.length === 0) {
                    return false;
                }
            }
            return true;
        }
    };
};
